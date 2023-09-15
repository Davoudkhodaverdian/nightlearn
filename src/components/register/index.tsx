"use client";
import React, { useRef, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import RegisterForm from './form';
import { Signup } from './models/signup';
import { SignupSchema } from './signupSchema';
import { SignupError } from './models/signupError';
import Data from './data.json';
import Link from 'next/link';

const Register : React.FC = ()=> {

  const [loading,setLoading] = useState(false);
  const getAuthUser = async (values: Signup, formikHelpers: FormikHelpers<Signup>)=>{
    try {
      setLoading(true);
        const result = await fetch('http://localhost:9000/api/auth/register',{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(values), // body data type must match "Content-Type" header
      });
      const data = await result.json();
      setLoading(false);
      console.log(data);
      if (data?.errors) {
        data?.errors?.map((item : SignupError)=>{
          const field = Data.find(i=>i?.name===item?.path) ? item?.path : "password";
          formikHelpers.setFieldError(field ,item?.message)
        })
      } else if (data?.error) {
        alert(data?.error?.message);
      }
    } catch (error) {
      setLoading(false);
      alert("متاسفانه خطایی رخ داده است");
      console.log(error);
    }
  }
  const initialValues : Signup ={firstName: '',lastName: '',email: '',phoneNumber:'',password:''};
  return (
    <div dir='rtl' className="p-12 ">
      <div className='text-xl p-3' >ثبت نام</div>
      <Formik
        initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values: Signup, formikHelpers: FormikHelpers<Signup>) => {
            // same shape as initial values
            // console.log(values);
            getAuthUser(values,formikHelpers);
          }}
      >
        {({ errors, touched }) => (
          <RegisterForm loading={loading} errors={errors} touched={touched}/>
        )}
      </Formik>
      <div className='p-3'>
          <Link href={'/login'}>وارد شوید</Link>
      </div>
    </div>
  )
}

export default Register;
