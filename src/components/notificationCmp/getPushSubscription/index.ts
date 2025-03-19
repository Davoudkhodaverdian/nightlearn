// create urlBase64ToUint8Array with chatgpt Ai
function urlBase64ToUint8Array(base64url: string) {
    // Replace URL-safe characters with standard Base64 characters
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');

    // Decode Base64 string to a binary string
    const binaryString = atob(base64);

    // Create a Uint8Array of the same length as the binary string
    const uint8Array = new Uint8Array(binaryString.length);

    // Loop over the binary string and fill the Uint8Array
    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    console.log({ uint8Array })
    return uint8Array;
}
// check push subscription
const checkPushSubscription = async () => {
    if ("serviceWorker" in navigator && "PushSubscription" in window) { // check push notification
        const registrtion = await navigator.serviceWorker.ready;
        const pushSubscription = await registrtion.pushManager.getSubscription();
        return pushSubscription;
    }
}
const getPushSubscription = async () => {
    // generate VAPIDKeys with npm install web-push -g and  web-push generate-vapid-keys [--json] command:
    // Public Key: BGa8_5HX_pzy-WP3WZXzvDxF3A27HoTGFzdxjKJeCzpt75kQaNkmuj6ttUTMyhwOySqmS44lnQ9Wc6Lnsrm78zE
    // Private Key: 9xXVX-adTNaKfG9khc0U8rDfrmEhhbcSZVq9NOuB1zE
    const webPushVAPIDKeys = {
        publicKey: 'BGa8_5HX_pzy-WP3WZXzvDxF3A27HoTGFzdxjKJeCzpt75kQaNkmuj6ttUTMyhwOySqmS44lnQ9Wc6Lnsrm78zE',
        privateKey: '9xXVX-adTNaKfG9khc0U8rDfrmEhhbcSZVq9NOuB1zE',
    }
    if ("serviceWorker" in navigator && "PushSubscription" in window) { // check push notification

        const subscribeOption: PushSubscriptionOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(webPushVAPIDKeys?.publicKey) as any
        }
        const registrtion = await navigator.serviceWorker.ready;
        const pushSubscription = await registrtion.pushManager.subscribe(subscribeOption);
        console.log({ pushSubscription })
        return pushSubscription;
    }
}
export { getPushSubscription, checkPushSubscription };