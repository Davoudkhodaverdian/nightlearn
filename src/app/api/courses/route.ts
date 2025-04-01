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
  const courses = await Course.find({});
  return NextResponse.json({
    courses: courses.map(course => (transform<ICourse>(course, requiredCourseData))), status: 200
  },
    { status: 200 });
}
