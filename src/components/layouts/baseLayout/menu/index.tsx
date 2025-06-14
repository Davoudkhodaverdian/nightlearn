import useAuth from "@/services/useAuth";
import Enter from "./enter";
import Items from "./items";
import Auth from "./auth";
import Loading from "@/components/common/loading";


const Menu: React.FC = () => {
    
    const { data ,error,isLoading} = useAuth();
    console.log( { data ,error,isLoading})
    return (
        <header className=" bg-white shadow w-full ">
            <div className="mx-[60px] flex justify-between items-center">
                <div className="flex items-center">
                    <div className="p-3">
                        <img className="max-h-[70px] rounded" src="/night-learn-logo.png" alt="night learn" />
                    </div>
                    <Items />
                </div>
                <div className="flex items-center">
                    {isLoading ? <Loading /> : data ? <Auth /> : <Enter />}
                    <div className="flex">
                        <div className="px-3 py-4 cursor-pointer">
                            <div>سبد خرید</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Menu;