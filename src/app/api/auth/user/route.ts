// app/api/auth/user/route.ts
import jwt from "jsonwebtoken";
import { requiredUserData, transform } from "@/inner-app-server/auth/functions";
import User, { IUser } from "@/inner-app-server/mongooose/models/user";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/inner-app-server/mongooose/connectToDatabase";
import getAuthorization from "@/inner-app-server/auth/functions/getAuthorization";
export async function GET(req: NextRequest) {

    try {
        const token = getAuthorization(req);
        if (!token) {
            return NextResponse.json({
                response: { status: 'fail', message: 'unauthorized' },
                status: 403
            }, { status: 403 });
        }
        // Token validation check
        let decoded = null;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { user_id: string };
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return NextResponse.json({
                    error: { message: 'توکن نامعتبر است', response: { message: 'The token is invalid.', }, },
                    status: 422
                }, { status: 422 });
            } else if (error instanceof jwt.TokenExpiredError) {
                return NextResponse.json({
                    error: { message: 'توکن منقضی شده است', response: { message: 'The token has expired.', }, },
                    status: 422
                }, { status: 422 });
            }
            return NextResponse.json({
                error: { message: 'filed to authenticate token', response: error, },
                status: 422
            }, { status: 422 });
        }

        // Finding a user by ID
        await connectToDatabase();
        const user = await User.findById(decoded?.user_id);
        if (!user) {
            return NextResponse.json({
                status: 422,
                response: { error: { message: "user not found" } }
            }, { status: 422 });
        }
        return NextResponse.json({
            response: { user: { ...transform<IUser>(user, requiredUserData) } },
            status: 200
        }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({
            error: { message: 'متاسفانه خطایی رخ داده است', response: error, },
            status: 500
        }, { status: 500 });
    }
}
