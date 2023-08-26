import ItemsData from './itemsData.json';

interface DashboardItem {
    name: string
    id: string
}

const Items : React.FC = ()=>{

    return (
        <div className="flex">
            {ItemsData.map((item: DashboardItem)=>(
                <div className='px-3 py-4 cursor-pointer' key={item.id}>
                    <div>
                        {item.name}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Items;