import Link from 'next/link';
import ItemsData from './itemsData.json';

interface DashboardItem {
    id: number
    name: string
    url: string
}

const Items : React.FC = ()=>{

    return (
        <div className="flex">
            {ItemsData.map((item: DashboardItem)=>(
                <div className='px-3 py-4 cursor-pointer' key={item.id}>
                    <div>
                     <Link href={item.url}>{item.name}</Link>  
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Items;