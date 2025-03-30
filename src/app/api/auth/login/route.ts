// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/inner-app-server/mongooose/connectToDatabase";
import User, { IUser } from "@/inner-app-server/mongooose/models/user";
import { createToken, customValidationResult, requiredUserData, transform } from "@/inner-app-server/auth/functions";
import { validators } from "@/inner-app-server/auth/login";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const { email, password } = await req.json();

        // Check validation and make custom validationResult (change msg to message) with express-validator
        await Promise.all(validators.map((rule) => rule.run({ body: { email, password } })));
        const errors = customValidationResult({ body: { email, password } });
        if (!errors.isEmpty()) {
            return NextResponse.json({ errors: errors.array(), status: 400 }, { status: 400 });
        }
        // Check the email is already registered or not
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                error: {
                    message: 'چنین ایمیلی ثبت نشده است، لطفا ثبت نام کنید',
                    response: { message: 'This email is not found!' },
                },
                status: 400
            }, { status: 400 });
        }

        // Verify password using the comparePassword method to compare hashed password
        const isMatch = await user.comparePassword(password); // using comparePassword method
        if (!isMatch) {
            return NextResponse.json({
                error: {
                    response: { message: "The password is incorrect" },
                    message: 'پسورد وارد شده صحیح نمی باشد',
                },
                status: 400
            }, { status: 400 });
        }
        // Create token and send data
        return NextResponse.json({
            message: 'You have successfully logged in.',
            response: { data: { ...transform<IUser>(user, requiredUserData), token: createToken(user._id as string) } },
            status: 200
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: {
                message: 'متاسفانه خطایی رخ داده است',
                response: error,
            },
            status: 500
        }, { status: 500 });
    }
}
