

// import Cookies from 'universal-cookie';
import { useAuthUserQuery } from '../api';

// if our cookie be httponly, we cannot access the cookie with javascript and libraries like universal-cookie
const useAuth = () => {
    // const cookie = new Cookies();
    // access cookie without httponly so that we can access cookie with javascript
    // const { data, isLoading, error } = useAuthUserQuery(cookie.get('nightlearn-token'));
    
    // access cookie with httponly so that we cannot access cookie with javascript and it does in backend and we access the cookie in the backend
    const { data, isLoading, error } = useAuthUserQuery('');
    return { data, isLoading, error }
}
export default useAuth;