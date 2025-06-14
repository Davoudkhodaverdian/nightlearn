import { checkPushSubscription, getPushSubscription } from "../getPushSubscription";

const sendSubscriptionToBackend = async () => {

    let pushSubscription = await checkPushSubscription(); // check push subscription
    console.log({ pushSubscription });
    if (!pushSubscription) pushSubscription = await getPushSubscription(); // if there is not push subscription, create it
    
    try {
        const result = await fetch('http://localhost:3000/api/save-subscription', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(pushSubscription)
        })
        const response = await result.json();
        console.log({ response });
    } catch (error) {
        console.log(error)
    }

}
export default sendSubscriptionToBackend;