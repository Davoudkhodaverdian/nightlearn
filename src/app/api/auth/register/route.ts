// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/inner-app-server/mongooose/connectToDatabase";
import User, { IUser } from "@/inner-app-server/mongooose/models/user";
import { createToken, customValidationResult, requiredUserData, transform } from "@/inner-app-server/auth/functions";
import { MongoServerError } from "mongodb";
import { validators } from "@/inner-app-server/auth/register";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const { firstname, lastname, email, password, admin } = await req.json();

        // Check validation and make custom validationResult (change msg to message) with express-validator
        await Promise.all(validators.map((rule) => rule.run({ body: { firstname, lastname, email, password } })));
        const errors = customValidationResult({ body: { firstname, lastname, email, password } });
        if (!errors.isEmpty()) {
            return NextResponse.json({ errors: errors.array(), status: 400 }, { status: 400 });
        }
        // Check the email is already registered or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                error: {
                    message: 'این ایمیل قبلا استفاده شده است، لطفا وارد شوید',
                    response: { message: 'This email user is already in use!', },
                },
                status: 400
            }, { status: 400 });
        }
        // Using pre middleware for hashing the password before save
        const newUser = new User({ firstname, lastname, email, password, admin });
        await newUser.save();
        // Create token and send data
        return NextResponse.json({
            message: 'The user has been registerd with us!',
            response: { data: { ...transform<IUser>(newUser, requiredUserData), token: createToken(newUser._id as string) } },
            status: 200
        }, { status: 200 });
    } catch (error: unknown) {
        // If the error is related to the uniqueness of the email in MongoDB
        if (error instanceof MongoServerError && error.code === 11000) {
            return NextResponse.json({
                error: {
                    message: 'این ایمیل قبلا استفاده شده است، لطفا وارد شوید',
                    response: { message: 'This email user is already in use!', },
                },
                status: 400
            }, { status: 400 });
        }
        return NextResponse.json({
            error: {
                message: 'متاسفانه خطایی رخ داده است',
                response: error,
            },
            status: 500
        }, { status: 500 });
    }
}
