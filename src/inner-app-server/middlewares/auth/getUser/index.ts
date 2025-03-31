import connectToDatabase from "@/inner-app-server/mongooose/connectToDatabase";
import User from "@/inner-app-server/mongooose/models/user";
import { NextRequest, NextResponse } from "next/server";

const getUser = async (user_id: string) => {
    try {
        // Finding a user by ID
        await connectToDatabase();
        const user = await User.findById(user_id);
        if (!user) {
            return NextResponse.json({
                status: 422,
                response: { error: { message: "user not found" } }
            }, { status: 422 });
        }
        return user;
    } catch (error) {
        return NextResponse.json({
            error: { message: 'متاسفانه خطایی رخ داده است', response: error, },
            status: 500
        }, { status: 500 });
    }
}
export default getUser;