// app/api/courses/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminMiddleware } from '@/inner-app-server/middlewares/admin';
import Course from '@/inner-app-server/mongooose/models/course';
import { corsMiddleware } from '@/app/api/middleware/cors';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const corsResponse = corsMiddleware(req);
    if (corsResponse.status === 403) return corsResponse;
    const adminUser = await adminMiddleware(req);

    if (adminUser instanceof NextResponse) {
        return adminUser; // If the admin Middleware has an issue, we return that error.
    }

    try {
        // asynchronous access of `params.id`.
        const { id: courseId } = await params
        if (!courseId) {
            return NextResponse.json({
                error: {
                    message: 'متاسفانه خطایی رخ داده است',
                    response: 'there is no courseId for removing',
                },
                status: 500
            }, { status: 500 });
        }
        const deleted = await Course.findByIdAndDelete(courseId);
        if (!deleted) {
            return NextResponse.json({
                error: {
                    message: 'متاسفانه خطایی رخ داده است',
                    response: 'Course not found',
                },
                status: 404
            }, { status: 404 });
        }
        return NextResponse.json({
            response: { message: 'The course was successfully deleted ' }, status: 200,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: {
                message: 'متاسفانه خطایی رخ داده است',
                response: error,
            },
            status: 500
        }, { status: 500 });
    }
}