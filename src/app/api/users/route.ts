import { NextResponse } from 'next/server';
import User from '@/services/server/mongooose/models/user';
import dbConnect from '@/services/server/mongooose/dbConnect';

export async function GET() {

  await dbConnect(); // connect mongoose db
  const users = await User.find({});
  return NextResponse.json(users);
}
