import { NextRequest, NextResponse } from 'next/server';
import { adminMiddleware } from '@/inner-app-server/middlewares/admin';
import Course, { ICourse } from '@/inner-app-server/mongooose/models/course';
import { corsMiddleware } from '../middleware/cors';
import { transform } from "@/inner-app-server/fundamental";
import { requiredCourseData } from '@/inner-app-server/course';

export async function GET(req: NextRequest) {

  const corsResponse = corsMiddleware(req);
  if (corsResponse.status === 403) return corsResponse;
  const adminUser = await adminMiddleware(req);

  if (adminUser instanceof NextResponse) {
    return adminUser; // If the admin Middleware has an issue, we return that error.
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    // Get a specific query parameter by name
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : null;
    const perpage = searchParams.get('per-page') ? parseInt(searchParams.get('per-page') as string) : null;
    // Get total number of courses (without limit/skip)
    const total = await Course.countDocuments();
    let courses = null;
    if (perpage && page) {
      courses = await Course.find({}).populate(['teacher', 'category']).skip(((page - 1) * perpage)).limit(perpage);
    } else {
      courses = await Course.find({}).populate(['teacher', 'category']);
    }
    return NextResponse.json({
      courses: courses.map(course => (transform<ICourse>(course, requiredCourseData))), status: 200,
      total, page,
      perpage,
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