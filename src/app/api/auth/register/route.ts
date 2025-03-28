// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/inner-app-server/mongooose/connectToDatabase";
import User, { IUser } from "@/inner-app-server/mongooose/models/user";
import { createToken, customValidationResult, transform } from "@/inner-app-server/auth";
import { MongoServerError } from "mongodb";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { firstname, lastname, email, password, admin } = await req.json();

        // Input validation and make custom validationResult (change msg to message) with express-validator
        const errors = customValidationResult(req);
        if (!errors.isEmpty()) {
            return NextResponse.json({ errors: errors.array() }, { status: 400 });
        }
        // Check if the email is already registered or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                message: 'این ایمیل قبلا استفاده شده است، لطفا وارد شوید',
                response: { message: 'This email user is already in use!', },
            }, { status: 400 });
        }
        // Using pre middleware for hashing the password before save
        const newUser = new User({ firstname, lastname, email, password, admin });
        // Create token and send data
        const requiredData: (keyof IUser)[] =
            ['firstname', 'lastname', 'email', "phonenumber", "created_at", "updated_at"]
        return NextResponse.json({
            message: 'The user has been registerd with us!',
            response: {
                data: {
                    ...transform<IUser>(newUser, requiredData),
                    token: createToken(newUser._id as string)
                }
            },
        }, { status: 200 });
    } catch (error: unknown) {
        // If the error is related to the uniqueness of the email in MongoDB
        if (error instanceof MongoServerError && error.code === 11000) {
            return NextResponse.json({
                message: 'این ایمیل قبلا استفاده شده است، لطفا وارد شوید',
                response: { message: 'This email user is already in use!', },
            }, { status: 400 });
        }
        return NextResponse.json({
            message: 'متاسفانه خطایی رخ داده است',
            response: { message: 'error', error },
        }, { status: 500 });
    }
}
