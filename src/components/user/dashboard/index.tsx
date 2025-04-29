import Link from "next/link";
import Items from "./items";
import Menu from "./menu";

// This file is currently in development
const Dashboard: React.FC = () => {

    return (
        <div className='flex'>

        <div className="p-5">
            <div>
                logo
            </div>
            <div>
                <Items />
            </div>
        </div>
        <div className='p-5'>
          <div >
            home page
          </div>
          <div className='text-blue-700'>
            <Link href="/about">{"->"} about</Link>
          </div>
          <div>
            <Menu/>
          </div>
        </div>
        
        </div>

    )
}

export default Dashboard;