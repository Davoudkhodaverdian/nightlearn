const getNotificationsState = async () => {

    if ('serviceWorker' in navigator) {
        if (navigator?.permissions) {
            const result = await navigator.permissions.query({ name: "notifications" })
            console.log({ result });
            return result?.state;
        }
    }
}
export default getNotificationsState;