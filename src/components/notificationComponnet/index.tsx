"use client";
import React, { useEffect, useRef } from "react";
import { getPushSubscription, checkPushSubscription } from "./getPushSubscription";
import requestPermission from "./requestPermission";
import getNotificationsState from "./getNotificationsState";
import sendSubscriptionToBackend from "./sendSubscriptionToBackend";

const NotificationComponnet: React.FC = () => {

    const requestNotification = useRef(null);
    useEffect(() => {
        // self calling async function javascript
        (async () => {
            const notificationsState = await getNotificationsState();
            console.log({notificationsState});
            let pushSubscription = await checkPushSubscription(); // check push subscription
            console.log({pushSubscription});
            if (!pushSubscription) pushSubscription = await getPushSubscription(); // if there is not push subscription, create it
            console.log(pushSubscription); // fcm is stand by Firebase Cloud Messaging
            await requestPermission();
        })().catch(err => {
            console.error(err);
        });

    }, [])

    return (
        <div>
            <h1>Notification Page</h1>
            <div><button ref={requestNotification} onClick={requestPermission}>Request Notification</button></div>
            <div><button ref={requestNotification} onClick={sendSubscriptionToBackend}>Send subscription to backend</button></div>
        </div>
    )
}
export default NotificationComponnet;