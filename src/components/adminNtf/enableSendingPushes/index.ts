
export default async function enableSendingPushes(payload: string) {
  // console.log({ payload });
  try {
    const result = await fetch('http://localhost:3000/api/trigger-push-msg/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    const response = await result.json();
    // console.log({response});
 
  } catch (error) {
    console.log(error);
  }

}