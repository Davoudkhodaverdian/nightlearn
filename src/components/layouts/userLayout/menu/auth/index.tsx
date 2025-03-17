import Loading from "@/components/loading";
import { removeAuthToken } from "@/services/cookie";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const Auth: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const rooter = useRouter();
    const logoutHandler = async () => {
         setLoading(true);
        await removeAuthToken();
         setLoading(false);
        return <></>
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