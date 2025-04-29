"use client";
import useAuth from "@/services/useAuth";

export default function User() {
  const { data } = useAuth();
   
    return (
  
      <div className="flex  flex-col  justify-between p-4">
        <div>
          User page
        </div>
        {/* <Dashboard/> */}
        <div className='p-3'>{data?.response?.user?.firstname} {data?.response?.user?.lastname} خوش آمدید</div>
      </div>
    )
  }
  