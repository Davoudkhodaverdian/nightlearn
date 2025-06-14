// app/api/category/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/inner-app-server/mongooose/connectToDatabase";
import { MongoServerError } from "mongodb";
import { requiredCategoryData, validators } from "@/inner-app-server/category";
import { validateRequest } from "@/inner-app-server/middlewares/validateRequest";
import { corsMiddleware } from "../middleware/cors";
import { transform } from "@/inner-app-server/fundamental";
import Category, { ICategory } from "@/inner-app-server/mongooose/models/category";

export async function POST(req: NextRequest) {
    try {
        // Execute cors Middleware
        const corsResponse = corsMiddleware(req);
        if (corsResponse.status === 403) return corsResponse;
        await connectToDatabase();
        const { name } = await req.json();

        // Execute validation middleware
        const validationResponse = await validateRequest<Partial<ICategory>>({ body: { name } }, validators);
        if (validationResponse) return validationResponse;
        
        // Check the title is already registered or not
        const existingName = await Category.findOne({ name });
        if (existingName) {
            return NextResponse.json({
                error: {
                    message: 'این نام قبلا استفاده شده است',
                    response: { message: 'This name is already in use!', },
                },
                status: 400
            }, { status: 400 });
        }
        const newCategory = new Category({ name, });
        await newCategory.save();
        // send data
        
        return NextResponse.json({
            message: 'The category has been saved!',
            response: { user: { ...transform<ICategory>(newCategory, requiredCategoryData) } },
            status: 200
        }, { status: 200 });
    } catch (error: unknown) {
        // If the error is related to the uniqueness of the email in MongoDB
        if (error instanceof MongoServerError && error.code === 11000) {
            return NextResponse.json({
                error: {
                    message: 'این نام قبلا استفاده شده است، لطفا آن را تغییر دهید',
                    response: { message: 'This name is already in use!', },
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
