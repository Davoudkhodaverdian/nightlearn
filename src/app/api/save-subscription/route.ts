import { NextResponse } from 'next/server';
import subscriptions from '@/services/server/mongooose/models/subscriptions';
import dbConnect from '@/services/server/mongooose/dbConnect';

export async function GET() {
  return NextResponse.json({ message: 'save subscription from Next.js API!' });
}

export async function POST(req: Request) {

  try {
    await dbConnect(); // connect mongoose db
    const body = await req.json();
    if (body?.endpoint) {
      // Not a valid subscription.
      return NextResponse.json({
        error: {
          id: 'no-endpoint',
          message: 'Subscription must have an endpoint.'
        }
      }, { status: 400 });
    }
    
    let newSubscription = new subscriptions({...body});

    await newSubscription.save();

    return NextResponse.json({ message: 'save subscription was successful' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      error: {
        id: 'unable-to-save-subscription',
        message: 'The subscription was received but we were unable to save it to our database.'
      }
    }, { status: 500 });
  }

};
