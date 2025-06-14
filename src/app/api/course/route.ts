// app/api/course/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/inner-app-server/mongooose/connectToDatabase";
import { MongoServerError } from "mongodb";
import { requiredCourseData, validators } from "@/inner-app-server/course";
import Course, { ICourse } from "@/inner-app-server/mongooose/models/course";
import { validateRequest } from "@/inner-app-server/middlewares/validateRequest";
import { corsMiddleware } from "../middleware/cors";
import { transform } from "@/inner-app-server/fundamental";

export async function POST(req: NextRequest) {
    try {
        // Execute cors Middleware
        const corsResponse = corsMiddleware(req);
        if (corsResponse.status === 403) return corsResponse;
        await connectToDatabase();
        const { name, title, description, category, price, teacher } = await req.json();

        // Execute validation middleware
        const validationResponse = await validateRequest<Partial<ICourse>>({ body: { name, title, price, category, teacher } }, validators);
        if (validationResponse) return validationResponse;

        // Check the title is already registered or not
        const existingTitle = await Course.findOne({ title });
        if (existingTitle) {
            return NextResponse.json({
                error: {
                    message: 'این عنوان قبلا استفاده شده است',
                    response: { message: 'This title is already in use!', },
                },
                status: 400
            }, { status: 400 });
        }
        const newCourse = new Course({ name, title, description, category, price, teacher });
        await newCourse.save();
        // send data
        return NextResponse.json({
            message: 'The course has been saved!',
            response: { user: { ...transform<ICourse>(newCourse, requiredCourseData) } },
            status: 200
        }, { status: 200 });
        
    } catch (error: unknown) {
        // If the error is related to the uniqueness of the email in MongoDB
        if (error instanceof MongoServerError && error.code === 11000) {
            return NextResponse.json({
                error: {
                    message: 'این عنوان قبلا استفاده شده است، لطفا آن را تغییر دهید',
                    response: { message: 'This title is already in use!', },
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
