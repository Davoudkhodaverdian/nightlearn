"use client";
import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Signin } from './models/signin';
import { LoginSchema } from './loginSchema';
import LoginForm from './form';
import Link from 'next/link';
import { LoginError } from './models/signinError';
import Data from './data.json';
import { useCookies } from 'react-cookie';
import { useLoginUserMutation } from '@/services/authApi';

const Login: React.FC = () => {
  const initialValues: Signin = { email: '', phoneNumber: '', password: '' };
  const [loginUser, { isLoading }] = useLoginUserMutation();
  console.log("Login")
  const [cookies, setCookie] = useCookies(['nightlearn-token']);
  const getAuthUser = async (values: Signin, formikHelpers: FormikHelpers<Signin>) => {
    try {
      // fetch with rtk query
      const data = await loginUser(values).unwrap();
      console.log(data);
      if (data?.status === 200) {
        // do some thing
        setCookie("nightlearn-token", data?.response?.data?.tocken, {
          maxAge: 3600 * 24 * 90, // three month
          domain: ".localhost"
          // domain: process.env.NODE_ENV === "development" ? "localhost" : process.env.DOMAIN
        });
      }
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errors) {
        error?.data?.errors?.map((item: LoginError) => {
          const field = Data.find(i => i?.name === item?.path) ? item?.path : "password";
          formikHelpers.setFieldError(field, item?.message)
        })
      } else if (error?.data?.error) {
        alert(error?.data?.error?.message);
      } else {
        alert("متاسفانه خطایی رخ داده است");
        console.log(error);

      }
    }
  }
  return (
    <div dir='rtl' className="p-12 ">
      <div className='text-xl p-3'>ورود</div>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values: Signin, formikHelpers: FormikHelpers<Signin>) => {
          // same shape as initial values
          // console.log(values);
          getAuthUser(values, formikHelpers);
        }}
      >
        {({ errors, touched }) => (
          <LoginForm loading={isLoading} errors={errors} touched={touched} />
          // <LoginForm loading={loading} errors={errors} touched={touched} />
        )}
      </Formik>
      <div className='p-3' >
        <Link href={'/register'}>ثبت نام کنید</Link>
      </div>
    </div>
  )
}

export default Login;
