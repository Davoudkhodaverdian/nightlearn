// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/inner-app-server/mongooose/connectToDatabase";
import User, { IUser } from "@/inner-app-server/mongooose/models/user";
import { createToken, transform } from "@/inner-app-server/fundamental";
import { MongoServerError } from "mongodb";
import { validators } from "@/inner-app-server/auth/register";
import { requiredUserData } from "@/inner-app-server/auth";
import { validateRequest } from "@/inner-app-server/middlewares/validateRequest";
import { corsMiddleware } from "../../middleware/cors";
import { UserRole } from "@/services/models/userRole";

export async function POST(req: NextRequest) {
    try {
        const corsResponse = corsMiddleware(req);
        if (corsResponse.status === 403) return corsResponse;
        await connectToDatabase();
        const { firstname, lastname, email, password, role } = await req.json();

        // Execute validation middleware
        const validationResponse = await validateRequest<Partial<IUser>>({ body: { firstname, lastname, email, password } }, validators);
        if (validationResponse) return validationResponse;

        // Check the email is already registered or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.authProvider === "google") {
                return NextResponse.json({
                    error: {
                        message: 'اکانت شما قبلا با Google ساخته شده است، لطفاً با Google وارد شوید.',
                        response: { message: 'Your account was previously created using Google. Please sign in with Google.', },
                    },
                    status: 400
                }, { status: 400 });
            } else {
                return NextResponse.json({
                    error: {
                        message: 'این ایمیل قبلا استفاده شده است، لطفا وارد شوید',
                        response: { message: 'This email user is already in use!', },
                    },
                    status: 400
                }, { status: 400 });
            }
        }
        // Using pre middleware for hashing the password before save
        const newUser = new User({
            firstname, lastname, email, password, authProvider: "credentials", roles: [UserRole.User, ...(role !== UserRole.User ? [role as UserRole] : [])]
        });
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
