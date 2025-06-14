import { NextResponse } from 'next/server';
import Subscription, { ISubscription } from '@/inner-app-server/mongooose/models/subscription';
import webpush from '@/inner-app-server/webpush';
import connectToDatabase from '@/inner-app-server/mongooose/connectToDatabase';

export async function GET() {
    return NextResponse.json({ message: 'trigger push msg from Next.js API!' });
}
const triggerPushMsg = async (subscription: any, dataToSend: any) => {
    try {
        const result = await webpush.sendNotification(subscription, JSON.stringify(dataToSend))
        // console.log({ result });
    } catch (error : any) {
        console.log({ error })
        if (error?.statusCode === 410) {
            return await (Subscription.findOneAndDelete({ _id: subscription._id }))
        } else {
            console.log('Subscription is no longer valid: ', error);
        }
    }
    return;
};
export async function POST(req: Request) {
    try {

        const dataToSend = await req.json();
        await connectToDatabase(); // connect mongoose db
        let subscriptions = await Subscription.find({});


        subscriptions.forEach(async (subscription: ISubscription) => {
            await triggerPushMsg(subscription, dataToSend);
        })
        return NextResponse.json({ data: { success: true } }, { status: 200 });

    } catch (err) {
        return NextResponse.json({
            error: {
                id: 'unable-to-send-messages',
                message: `We were unable to send messages to all subscriptions : ${(err as any)?.message}`
            }
        }, { status: 500 });
    }
};
