
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const storeAuthToken = (token: string) => {

    cookies.set('nightlearn-token', token, {
        path: '/',
        domain: ".localhost",
        maxAge: 3600 * 24 * 30 * 3, // 3 month
        // secure: true // Is only accessible through HTTPS
        // httpOnly: true // Is only the server can access the cookie? Note: You cannot get or set httpOnly cookies from the browser, only the server.
    })
}


const removeAuthToken = () => {


}

export { storeAuthToken, removeAuthToken };