import { NextResponse } from 'next/server';
import User from '@/inner-app-server/mongooose/models/user';
import connectToDatabase from '@/inner-app-server/mongooose/connectToDatabase';

export async function GET() {

  await connectToDatabase(); // connect mongoose db
  const users = await User.find({});
  return NextResponse.json(users);
}
