import Auth from "./auth";
import Items from "./items";

const Menu: React.FC = () => {

    return (
        <div className=" bg-white shadow w-full ">
            <div className="mx-[60px]  flex justify-between items-center">
                <div className="flex items-center">
                    <div className="p-3">
                        <img className="max-h-[70px] rounded" src="/night-learn-logo.png" alt="night learn" />
                    </div>
                    <Items />
                </div>
                <div className="flex items-center">
                    <Auth />
                    <div className="flex">
                        <div className="px-3 py-4 cursor-pointer">
                            <div>سبد خرید</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Menu;