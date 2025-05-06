'use client';

const Home = () => {

  // let options = { year: 'numeric', month: 'long', day: 'numeric' };
  // let today = new Date().toLocaleDateString('fa-IR', options);
  // console.log(today);

  let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');

  return (
    <section className="flex  flex-col  justify-between p-4">
      <h3 className='p-3'>تاریخ امروز {today} - {new Date().toLocaleDateString()}</h3>
      <h1>صفحه اصلی</h1>
    </section>
  )
}

export default Home;