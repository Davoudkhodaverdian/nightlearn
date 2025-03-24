const requestPermission = async () => {

    if ("serviceWorker" in navigator && "PushManager" in window) { // check push notification

        const result = await Notification.requestPermission();
        console.log({ result }) // granted, denied, default
        if (result === "granted") {
            // new Notification("Hi there!", {});
            // or
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification("Hi there!", {
                    body: "this is a simple text",
                    icon:"/night-learn-logo.png",

                } as NotificationOptions)
            })
        }
    }
}
export default requestPermission;