'use client';

const Home = () => {

  // let options = { year: 'numeric', month: 'long', day: 'numeric' };
  // let today = new Date().toLocaleDateString('fa-IR', options);
  // console.log(today);

  let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');

  return (
    <div>
      <div className='p-3'> تاریخ امروز {today} - {new Date().toLocaleDateString()}</div>
      <div>
        <div>
          <div className='p-3'>صفحه اصلی</div>
        </div>
      </div>
    </div>
  )
}

export default Home;