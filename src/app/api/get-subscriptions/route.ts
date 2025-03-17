import { NextResponse } from 'next/server';
import Subscriptions, { ISubscription } from '@/services/server/mongooose/models/subscriptions';
import dbConnect from '@/services/server/mongooose/dbConnect';


export async function GET() {
  try {
    await dbConnect(); // connect mongoose db
    const subscriptions = await Subscriptions.find({});
    const reducedSubscriptions = subscriptions.map((subscription : ISubscription) => {
      return {
        id: subscription._id,
        endpoint: subscription.endpoint
      }
    });
    return NextResponse.json({ message: 'Reduced Subscriptions data', data: {
      subscriptions: reducedSubscriptions
    } });
  } catch (err) {

    return NextResponse.json({
      error: {
        id: 'unable-to-get-subscriptions',
        message: 'We were unable to get the subscriptions from our database.'
      }
    }, { status: 500 });
  }
};
