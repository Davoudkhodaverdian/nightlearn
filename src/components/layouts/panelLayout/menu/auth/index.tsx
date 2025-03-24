import Loading from "@/components/common/loading";
import { authApi } from "@/services/store/authApi";
import { removeAuthToken } from "@/services/cookie";
import { useAppDispatch } from "@/services/store/hooks";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const Auth: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const logoutHandler = async () => {
        setLoading(true);
        const response = await removeAuthToken();
        setLoading(false);
        console.log(response)
        console.log(response && response?.code === 200)
        if (response && response?.code === 200) {
            dispatch(authApi.util.resetApiState());
            router.push('/');
        }

    }

    return (
        <div className="flex">
            <Link href={'/panel'} className="text-white rounded bg-[#0c056d] px-3 py-2 cursor-pointer mx-2" >پنل</Link>
            <div onClick={() => { logoutHandler() }} className="text-white rounded bg-[#0c056d] px-3 py-2 cursor-pointer mx-2" >
                {loading ? <Loading /> : <span>خروج</span>}
            </div>
        </div>
    )
}

export default Auth;