'use client';

import useAuth from "@/services/useAuth";

const Home = () => {

  // let options = { year: 'numeric', month: 'long', day: 'numeric' };
  // let today = new Date().toLocaleDateString('fa-IR', options);
  // console.log(today);

  let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');
  const { data } = useAuth();
  return (
    <section className="flex  flex-col  justify-between p-4">
      <h3 className='p-3'>تاریخ امروز {today} - {new Date().toLocaleDateString()}</h3>
      <h1>صفحه اصلی</h1>
      {
        data &&
        <p className='p-3'>{data?.response?.user?.firstname} {data?.response?.user?.lastname} خوش آمدید</p>
      }
    </section>
  )
}

export default Home;