"use client";
import useAuth from "@/services/useAuth";

export default function User() {
  const { data } = useAuth();
   
    return (
  
      <div className="flex  flex-col  justify-between p-4">
        <div>
          User page
        </div>
        <div className='p-3'>first name {data?.response?.user?.firstname}</div>
      </div>
    )
  }
  