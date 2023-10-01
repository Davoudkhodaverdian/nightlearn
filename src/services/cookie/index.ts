
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const storeAuthToken = (token: string) => {

    cookies.set('nightlearn-token', token, {
        path: '/',
        domain: ".localhost",
        maxAge: 3600 * 24 * 30 * 3 // 3 month
    })
}


const removeAuthToken = () => {


}

export { storeAuthToken, removeAuthToken };