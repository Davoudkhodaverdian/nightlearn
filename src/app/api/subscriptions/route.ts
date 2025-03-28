import { NextResponse } from 'next/server';
import Subscription from '@/inner-app-server/mongooose/models/subscription';
import connectToDatabase from '@/inner-app-server/mongooose/connectToDatabase';

export async function GET() {
  await connectToDatabase(); // connect mongoose db
  const subscriptions = await Subscription.find({});
  return NextResponse.json(subscriptions);
}
