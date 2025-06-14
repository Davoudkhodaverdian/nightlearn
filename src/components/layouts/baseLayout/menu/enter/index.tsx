import Link from "next/link";

const Enter : React.FC = ()=>{

    return (
        <div>
            <div className="px-3 py-4 cursor-pointer">
                <Link href={'/login'}  className="text-white rounded bg-[#0c056d] px-3 py-2 cursor-pointer mx-2" >ورود</Link>
                <Link href={'/register'}  className="text-white rounded bg-[#0c056d] px-3 py-2 cursor-pointer mx-2" >عضویت</Link>
            </div>
        </div>
    )
}

export default Enter;