import ItemsData from './itemsData.json';

interface DashboardItem {
    name: string
    id: string
}

const Items : React.FC = ()=>{

    return (
        <div className="p-5">
            {ItemsData.map((item: DashboardItem)=>(
                <div className='p-1' key={item.id}>
                    <div>
                        {item.name}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Items;