import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import getToken from "./getToken";
import connectToDatabase from "@/inner-app-server/mongooose/connectToDatabase";
import getUser from "./getUser";


// Authentication Middleware
export async function authMiddleware(req: NextRequest) {

    try {
        await connectToDatabase();
        const token = await getToken(req) ;
        if (!token) {
            return NextResponse.json({
                response: { status: 'fail', message: 'unauthorized' },
                status: 403
            }, { status: 403 });
        }
        // Token validation check
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { user_id: string };
        console.log({ decoded });
        // Finding a user by ID
        const user = await getUser(decoded?.user_id);
        return user;
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
}
