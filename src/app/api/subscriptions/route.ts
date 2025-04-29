import { NextResponse } from 'next/server';
import Subscription, { ISubscription } from '@/inner-app-server/mongooose/models/subscription';
import connectToDatabase from '@/inner-app-server/mongooose/connectToDatabase';


export async function GET() {
  try {
    await connectToDatabase(); // connect mongoose db
    const subscriptions = await Subscription.find({});
    const reducedSubscriptions = subscriptions.map((subscription : ISubscription) => {
      return {
        id: subscription._id,
        endpoint: subscription.endpoint
      }
    });
    return NextResponse.json({ message: 'Reduced Subscriptions data', data: {
      subscriptions: reducedSubscriptions
    } });
  } catch (error) {

    return NextResponse.json({
      error: {
        id: 'unable-to-get-subscriptions',
        message: 'We were unable to get the subscriptions from our database.',
        error
      }
    }, { status: 500 });
  }
};
