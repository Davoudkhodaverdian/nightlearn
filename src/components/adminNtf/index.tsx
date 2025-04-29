"use client";
import { useEffect, useRef, useState } from "react";
import getSubscriptionList from "./getSubscriptionList";
import enableSendingPushes from "./enableSendingPushes";

interface ISubscription {
    endpoint: string
    id: string
}
// Admin Notification Component
const adminNtf: React.FC = () => {

    const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [text, setText] = useState<string>(
        `
        {
            "notification": {
                "title": "Example Title",
                "body": "This will be the body text for the notification.",
                "icon": "/night-learn-logo.png"
            }
        }
        `
    );
    useEffect(() => {
        getSubscriptionList()
            .then((subscriptionsList) => {
                if (subscriptionsList) setSubscriptions(subscriptionsList);
                if (subscriptionsList?.length > 0) {
                    if (textAreaRef?.current?.value)
                        return enableSendingPushes(JSON.parse(textAreaRef?.current?.value));
                } else {
                    console.error('No subscriptions on the server, so can\'t ' + 'trigger any push messages');
                }
            });
    }, [])

    return (
        <main>
            <h1>Admin | Example Site</h1>
            <h2>Send Push Message</h2>

            <p>Clicking "Trigger Push Message" will make
                an API request to "/api/trigger-push-msg" (i.e. an API call to our
                node backend) and that will trigger a push message to all our users.
            </p>

            <p>Feel free to change the text to anything you want.</p>

            <div className="w-full min-w-full max-w-[100px]">
                <textarea ref={textAreaRef} rows={10} onChange={(e => { setText(e?.target?.value) })} className="w-full min-w-full" value={text}></textarea>
                <button className=""
                    onClick={() => {
                        // console.log({subscriptions})
                        
                        if (subscriptions?.length > 0) {
                            if (textAreaRef?.current?.value)
                                return enableSendingPushes(JSON.parse(textAreaRef?.current?.value));
                        }
                    }}
                >Trigger Push Message</button>
            </div>
            <h2>Subscriber List</h2>
            <div className="">
                {
                    subscriptions?.map(subscription => (
                        <div className="break-all p-3 border ml-1 mr-1" key={subscription?.id}>endpoint: {subscription?.endpoint}</div>
                    ))
                }
            </div>
        </main>

    )
}
export default adminNtf;