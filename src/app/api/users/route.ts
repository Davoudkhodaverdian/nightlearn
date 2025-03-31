import { NextRequest, NextResponse } from 'next/server';
import User from '@/inner-app-server/mongooose/models/user';
import connectToDatabase from '@/inner-app-server/mongooose/connectToDatabase';
import { adminMiddleware } from '@/inner-app-server/middlewares/admin';

export async function GET(req: NextRequest) {

  const adminUser = await adminMiddleware(req);

  if (adminUser instanceof NextResponse) {
    return adminUser; // If the admin Middleware has an issue, we return that error.
  }
  const users = await User.find({}).select("-password"); // Retrieve the list of users without displaying passwords.
  return NextResponse.json(users);
}
