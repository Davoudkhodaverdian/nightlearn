
const getSubscriptionList = async () => {
    try {
        const result = await fetch('http://localhost:3000/api/get-subscriptions/', {
            method: 'GET'
        })
        const response = await result.json();
        const subscriptions = response?.data?.subscriptions;
        console.log({ subscriptions });
        return subscriptions;
    } catch (error) {
        console.log({ error })
    }


}
export default getSubscriptionList