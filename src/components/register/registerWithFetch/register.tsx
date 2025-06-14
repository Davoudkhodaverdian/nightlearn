// this file is not be using
"use client";
import React, { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import RegisterForm from '../form';
import { Signup } from '../models/signup';
import { SignupSchema } from '../signupSchema';
import { SignupError } from '../models/signupError';
import Data from '../data.json';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { storeAuthToken } from '@/services/cookie';
import { UserRole } from '@/services/models/userRole';

const Register: React.FC = () => {
  const initialValues: Signup = {
    firstname: '', lastname: '', email: '', phonenumber: '', password: '', role: UserRole.User
  };
  const [loading, setLoading] = useState(false); // for using fetch function
  const router = useRouter();
  const getAuthUser = async (values: Signup, formikHelpers: FormikHelpers<Signup>) => {
    // using fetch function start
    try {
      setLoading(true);
      const baseUrl = 'http://localhost:9000/api/auth/register';  // mysql
      // const baseUrl = 'http://localhost:27017/api/auth/register';  // mongodb
      const result = await fetch(baseUrl, {
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
      if (data?.status === 200) {
        // do some thing
        await storeAuthToken(data?.response?.data?.token);
        router.push("/");
      } else {
        if (data?.errors) {
          data?.errors?.map((item: SignupError) => {
            const field = Data.find(i => i?.name === item?.path) ? item?.path : "password";
            formikHelpers.setFieldError(field, item?.message)
          })
        } else if (data?.error) {
          alert(data?.error?.message);
        } else {
          alert("متاسفانه خطایی رخ داده است");
          console.log(data);
        }
      }
    } catch (error) {
      setLoading(false);
      alert("متاسفانه خطایی رخ داده است");
      console.log(error);
    }
    // using fetch function end
  }

  return (
    <div className="p-12 ">
      <h2 className='text-xl p-3' >ثبت نام</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values: Signup, formikHelpers: FormikHelpers<Signup>) => {
          // same shape as initial values
          // console.log(values);
          getAuthUser(values, formikHelpers);
        }}
      >
        {({ errors, touched, handleBlur, handleChange, values }) => (
          <RegisterForm
            loading={loading}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        )}
      </Formik>
      <div className='p-3'>
        <Link href={'/login'}>وارد شوید</Link>
      </div>
    </div>
  )
}

export default Register;
