import { NextResponse } from 'next/server';

import Subscriptions, { ISubscription } from '@/services/server/mongooose/models/subscriptions';
import webpush from '@/services/server/webpush';
import dbConnect from '@/services/server/mongooose/dbConnect';

export async function GET() {
    return NextResponse.json({ message: 'save subscription from Next.js API!' });
}
const triggerPushMsg = async (subscription: any, dataToSend: any) => {

    return webpush.sendNotification(subscription, JSON.stringify(dataToSend))
        .catch(async (err) => {
            if (err.statusCode === 410) {
                return await (Subscriptions.find({ _id: subscription._id }) as any)?.remove();
            } else {
                console.log('Subscription is no longer valid: ', err);
            }
        });
};
export async function POST(req: Request) {
    try {
        const dataToSend = await req.json();
        await dbConnect(); // connect mongoose db
        let subscriptions = await Subscriptions.find({});
        subscriptions.forEach(async (subscription : ISubscription) => {
            await triggerPushMsg(subscription, dataToSend);
        })
        return NextResponse.json({ data: { success: true } });

    } catch (err) {
        return NextResponse.json({
            error: {
                id: 'unable-to-send-messages',
                message: `We were unable to send messages to all subscriptions : ` +
                    `'${(err as any)?.message}'`
            }
        }, { status: 500 });
    }
};
