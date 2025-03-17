'use client'
import { useState } from "react";


const Menu: React.FC = () => {

    const [active, setActive] = useState(false);

    return (
        <div className="m-5 ">
            <div onClick={() => { setActive(prev => !prev) }}
                className={`overflow-hidden relative w-8 h-8 border border-gray-600
                 bg-white shadow rounded flex justify-center
                  items-center cursor-pointer`}>
                <span className={`${active ? 'w-5 translate-y-[0px] rotate-45' :
                'w-3 translate-y-[-7.5px]'} duration-500 absolute  h-[2px] bg-gray-900 rounded  left-[5px]`}>
                </span>
                <span className={`${active ? 'translate-x-[60px]' :''}
                 duration-500 absolute w-5 h-[2px] bg-gray-900 rounded`}></span>
                <span className={`${active ? 'w-5 translate-y-[0px] rotate-[315deg]' :
                'translate-y-[7.5px]  w-[6px]'} duration-500 absolute h-[2px] bg-gray-900 rounded left-[5px]`}>
                </span>
            </div>
        </div>
    )
}
export default Menu;
