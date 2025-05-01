import { NextRequest, NextResponse } from 'next/server';
import { adminMiddleware } from '@/inner-app-server/middlewares/admin';
import Category, { ICategory } from '@/inner-app-server/mongooose/models/category';
import { corsMiddleware } from '../middleware/cors';
import { transform } from "@/inner-app-server/fundamental";
import { requiredCategoryData } from '@/inner-app-server/category';


export async function GET(req: NextRequest) {

  const corsResponse = corsMiddleware(req);
  if (corsResponse.status === 403) return corsResponse;
  const adminUser = await adminMiddleware(req);

  if (adminUser instanceof NextResponse) {
    return adminUser; // If the admin Middleware has an issue, we return that error.
  }
  const categories = await Category.find({});
  return NextResponse.json({
    categories: categories.map(category => (transform<ICategory>(category, requiredCategoryData))),
    status: 200
  }, { status: 200 });
}
