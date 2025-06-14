// app/api/auth/user/route.ts
import { transform } from "@/inner-app-server/fundamental";
import { IUser } from "@/inner-app-server/mongooose/models/user";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/inner-app-server/middlewares/auth";
import { requiredUserData } from "@/inner-app-server/auth";
import { corsMiddleware } from "../../middleware/cors";

export async function GET(req: NextRequest) {

    try {
        const corsResponse = corsMiddleware(req);
        if (corsResponse.status === 403) return corsResponse;
        const user = await authMiddleware(req);
        if (user instanceof NextResponse) {
            return user; // If the authentication has an issue, we return that error.
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
