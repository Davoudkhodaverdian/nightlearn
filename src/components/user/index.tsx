"use client";
import useAuth from "@/services/useAuth";

export default function User() {
  const { data } = useAuth();

  return (
    <section className="flex  flex-col  justify-between p-4">
      <h1>صفحه کاربر</h1>
      <h3 className='p-3'>{data?.response?.user?.firstname} {data?.response?.user?.lastname} خوش آمدید</h3>
    </section>
  )
}
