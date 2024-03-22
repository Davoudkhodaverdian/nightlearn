'use client';
import useAuth from "@/services/useAuth";

const Home  = () => {

  // let options = { year: 'numeric', month: 'long', day: 'numeric' };
  // let today = new Date().toLocaleDateString('fa-IR', options);
  // console.log(today);

  let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');

  return (
    <div dir='rtl'>
      <div className='p-3'> تاریخ امروز {today} - {new Date().toLocaleDateString()}</div>
      <div>
        <div dir='ltr'>
        <div className='p-3'>home page</div>
        </div>
      </div>
    </div>
  )
}

export default Home;