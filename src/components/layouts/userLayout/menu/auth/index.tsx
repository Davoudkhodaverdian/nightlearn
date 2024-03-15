import Link from "next/link";

const Auth : React.FC = ()=>{

    return (
        <div>
            <div className="px-3 py-4 cursor-pointer">
                <Link href={'/panel'}  className="text-white rounded bg-[#0c056d] px-3 py-2 cursor-pointer mx-2" >پنل</Link>
            </div>
        </div>
    )
}

export default Auth;