import { NextResponse } from "next/server";
import { authMiddleware } from "../auth";
import { UserRole } from "@/services/models/userRole";


// Middleware to check admin access
export async function adminMiddleware(req: any) {

    const user = await authMiddleware(req);
    if (user instanceof NextResponse) {
        return user; // If the authentication has an issue, we return that error.
    }

    if (!user.roles.includes(UserRole.Admin)) {
        return NextResponse.json({
            error: {
                message: 'دسترسی غیرمجاز، شما ادمین نیستید!',
                response: { message: 'Unauthorized access, you are not an admin!', },
            },
            status: 403
        }, { status: 403 });
    }

    return user; // If the user is an admin, we return their information.
}
