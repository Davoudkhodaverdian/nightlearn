// "use client";
import Home from '@/components/home';
// import { useEffect } from 'react';

const HomePage = async () => {

  // const getUserData = async () => {
  //   const data = await fetch('http://localhost:3000/api/auth/user', {
  //     credentials: "include"
  //   });
  //   const user = await data.json();
  //   console.log({ user });
  //   return user;
  // }
  // const user = await getUserData();
  // useEffect(() => {
  //   getUserData();
  // }, []);
  return (
    <>
    {/* <div>
      drrdrrd
    </div> */}
    <Home />
    </>
  )
}


export default HomePage;