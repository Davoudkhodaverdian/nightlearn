"use client";
import React, { useEffect, useRef, useState } from "react";
import { getPushSubscription, checkPushSubscription } from "./getPushSubscription";
import requestPermission from "./requestPermission";
import getNotificationsState from "./getNotificationsState";
import sendSubscriptionToBackend from "./sendSubscriptionToBackend";

// Notification Component
const NotificationCmp: React.FC = () => {
    const SubscribeRef = useRef(null);
    const handleSubscription = async () => {

        if ("serviceWorker" in navigator && "PushSubscription" in window) { // check push notification
            let pushSubscription = await checkPushSubscription(); // check push subscription
            if (pushSubscription) {
                await pushSubscription.unsubscribe();
                (SubscribeRef?.current as any)?.setHTMLUnsafe("Unsubscribed click to be Subscribed")
                let subscription = await checkPushSubscription(); // check push subscription
                console.log({ subscription })

            }
            else {
                await getPushSubscription();
                (SubscribeRef?.current as any)?.setHTMLUnsafe("Subscribed click to be unSubscribed")
            }
        }
    }
    const showNotification = async () => {
        console.log('showNotification')

        try {
            const registration = await navigator.serviceWorker.ready;
            console.log(registration)
            console.log({ registration })
            await registration.showNotification("Hi there!", {
                body: "this is a simple text",
                 icon:"/night-learn-logo.png",

            } as NotificationOptions).then(result => { console.log(result) }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // self calling async function javascript
        (async () => {
            const notificationsState = await getNotificationsState();
            console.log({ notificationsState });
            let pushSubscription = await checkPushSubscription(); // check push subscription
            if (pushSubscription)
                (SubscribeRef?.current as any)?.setHTMLUnsafe("Subscribed click to be unSubscribed")
            console.log({ pushSubscription });
            // if (!pushSubscription) {
            //     pushSubscription = await getPushSubscription(); // if there is not push subscription, create it
            // }
            console.log(pushSubscription); // fcm is stand by Firebase Cloud Messaging
            await requestPermission();
        })().catch(err => {
            console.error(err);
        });

    }, [SubscribeRef])

    return (
        <div>
            <h1>Notification Page</h1>
            <div><button onClick={requestPermission}>Request Notification</button></div>
            <div><button onClick={showNotification}>show Notification</button></div>
            <div><button ref={SubscribeRef} onClick={handleSubscription}>Unsubscribed click to be Subscribed</button></div>
            <div><button onClick={sendSubscriptionToBackend}>Send subscription to backend</button></div>
        </div>
    )
}
export default NotificationCmp;