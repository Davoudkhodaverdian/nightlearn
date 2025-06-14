import { NextRequest, NextResponse } from 'next/server';
import User, { IUser } from '@/inner-app-server/mongooose/models/user';
import { adminMiddleware } from '@/inner-app-server/middlewares/admin';
import { requiredUserData } from '@/inner-app-server/auth';
import { transform } from "@/inner-app-server/fundamental";

export async function GET(req: NextRequest) {

  const adminUser = await adminMiddleware(req);

  if (adminUser instanceof NextResponse) {
    return adminUser; // If the admin Middleware has an issue, we return that error.
  }
  const users = await User.find({}).select("-password"); // Retrieve the list of users without displaying passwords.
  return NextResponse.json({ users: users.map(user => (transform<IUser>(user, requiredUserData))), status: 200 },{ status: 200 });

}
