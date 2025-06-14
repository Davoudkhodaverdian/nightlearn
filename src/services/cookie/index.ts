import Cookies from 'universal-cookie';


// storeAuthToken without http only start
// const storeAuthToken = (token: string) => {
//     const cookies = new Cookies();
//     cookies.set('NHTLN', token, {
//         path: '/',
//         domain: ".localhost",
//         maxAge: 3600 * 24 * 30 * 3, // 3 month
//         // secure: true // Is only accessible through HTTPS
//         // httpOnly: true // Is only the server can access the cookie? Note: You cannot get or set httpOnly cookies from the browser, only the server.
//     })
// }
// storeAuthToken without http only end

// storeAuthToken with http only start
const storeAuthToken = async (token: string) => {
    try {
        let res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token })
        });
        console.log({ res })

    } catch (error) {
        console.log({ error })
    }
};
// storeAuthToken with http only end

const removeAuthToken = async () => {
    // without http only
    // const cookies = new Cookies();
    // cookies.remove("NHTLN"); // nightlearn-token

    // with http only
    try {
        let result = await fetch("/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const response = await result.json();
        return response;
    } catch (error) {
        console.log({ error })
        return error;
    }
}

export { storeAuthToken, removeAuthToken };