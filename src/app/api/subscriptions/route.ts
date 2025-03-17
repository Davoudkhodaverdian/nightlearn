import { NextResponse } from 'next/server';
import Subscriptions from '@/services/server/mongooose/models/subscriptions';
import dbConnect from '@/services/server/mongooose/dbConnect';

export async function GET() {
  await dbConnect(); // connect mongoose db
  const subscriptions = await Subscriptions.find({});
  return NextResponse.json(subscriptions);
}
