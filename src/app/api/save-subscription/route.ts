import { NextResponse } from 'next/server';

import connectToDatabase from '@/inner-app-server/mongooose/connectToDatabase';
import subscription from '@/inner-app-server/mongooose/models/subscription';

export async function GET() {
  return NextResponse.json({ message: 'save subscription from Next.js API!' });
}

export async function POST(req: Request) {

  try {
    await connectToDatabase(); // connect mongoose db
    const { endpoint, keys, expirationTime } = await req.json();
    if (!endpoint || !keys?.auth || !keys?.p256dh) {
      // Not a valid subscription.
      return NextResponse.json({
        error: {
          id: 'no-endpoint',
          message: 'Subscription must have an endpoint.'
        }
      }, { status: 400 });
    }
    // Check if the subscription already exists
    const existingSubscription = await subscription.findOne({ endpoint });
    if (existingSubscription) {
      // If it exists, update the keys
      existingSubscription.keys = keys;
      await existingSubscription.save();
      return NextResponse.json({ message: 'Subscription updated' }, { status: 200 });
    } else {
      // If not, create a new subscription
      const newSubscription = new subscription({ endpoint, keys, expirationTime });
      await newSubscription.save();
      return NextResponse.json({ message: 'save subscription was successful' }, { status: 201 });
    }
    

  } catch (err) {
    return NextResponse.json({
      error: {
        id: 'unable-to-save-subscription',
        message: 'The subscription was received but we were unable to save it to our database.'
      }
    }, { status: 500 });
  }

};
