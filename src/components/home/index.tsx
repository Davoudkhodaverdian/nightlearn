import Link from 'next/link';




const Home = () => {

  // let options = { year: 'numeric', month: 'long', day: 'numeric' };
  // let today = new Date().toLocaleDateString('fa-IR', options);
  // console.log(today);

  let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');
  console.log(today);

  return (
    <div dir='rtl'>
      <div className='p-3'> تاریخ امروز {today} - {new Date().toLocaleDateString()}</div>
      <div className='p-3'>home page</div>
    </div>
  )
}

export default Home;