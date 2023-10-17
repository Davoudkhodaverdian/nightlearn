

import Cookies from 'universal-cookie';
import { useAuthUserQuery } from '../api';

const useAuth = () => {
    const cookie = new Cookies();
    const { data, isLoading,error } = useAuthUserQuery(cookie.get('nightlearn-token'));
    return {data, isLoading,error}
}

export default useAuth;