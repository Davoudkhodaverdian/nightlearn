"use client";
import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Signin } from './models/signin';
import { LoginSchema } from './loginSchema';
import LoginForm from './form';
import Link from 'next/link';
import fieldData from './data.json';
import { useLoginUserMutation } from '@/services/store/authApi';
import { storeAuthToken } from '@/services/cookie';
import { useRouter } from 'next/navigation'
import getValidationErrorFields from '@/services/getValidationErrorFields';
import LoginWithGoogle from '../common/loginWithGoogle';



const Login: React.FC = () => {
  const initialValues: Signin = { email: '', phonenumber: '', password: '' };
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();
  const getAuthUser = async (values: Signin, formikHelpers: FormikHelpers<Signin>) => {
    try {
      // fetch with rtk query
      const data = await loginUser(values).unwrap();
      console.log(data);
      if (data?.status === 200) {
        // do some thing
        await storeAuthToken(data?.response?.data?.token);
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errors) {
        const errors = getValidationErrorFields(error?.data?.errors, fieldData);
        errors.map(({ name, value }) => { formikHelpers.setFieldError(name, value); });
      } else if (error?.data?.error) {
        alert(error?.data?.error?.message);
      } else {
        alert("متاسفانه خطایی رخ داده است");
        console.log(error);
      }
    }
  }
  return (
    <div className="p-12 ">
      <h2 className='text-xl p-3'>ورود</h2>
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
        )}
      </Formik>
      <LoginWithGoogle />
      <p className='p-3'>هنوز ثبت نام نکرده اید <Link className='text-[#2e2798]' href={'/register'}>ثبت نام کنید</Link></p>
    </div>
  )
}

export default Login;
