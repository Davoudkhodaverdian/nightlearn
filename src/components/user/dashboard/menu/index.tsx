'use client'
import { useState } from "react";


const Menu: React.FC = () => {

    const [active, setActive] = useState(false);

    return (
        <div className="p-5">
            <div onClick={() => { setActive(prev => !prev) }}
                className={`overflow-hidden relative w-16 h-16
                 bg-white shadow rounded flex justify-center
                  items-center cursor-pointer`}>
                <span className={`${active ? 'w-10 translate-y-[0px] rotate-45' :
                'w-6 translate-y-[-15px]'} duration-500 absolute  h-1 bg-gray-900 rounded  left-3`}>
                </span>
                <span className={`${active ? 'translate-x-[60px]' :''}
                 duration-500 absolute w-10 h-1 bg-gray-900 rounded`}></span>
                <span className={`${active ? 'w-10 translate-y-[0px] rotate-[315deg]' :
                'translate-y-[15px]  w-3'} duration-500 absolute h-1 bg-gray-900 rounded left-3`}>
                </span>
            </div>
        </div>
    )
}
export default Menu;
