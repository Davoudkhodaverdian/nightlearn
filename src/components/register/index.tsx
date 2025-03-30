"use client";
import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import RegisterForm from './form';
import { Signup } from './models/signup';
import { SignupSchema } from './signupSchema';
import { SignupError } from './models/signupError';
import Data from './data.json';
import Link from 'next/link';
import { useRegisterUserMutation } from '@/services/store/authApi';
import { storeAuthToken } from '@/services/cookie';
import { useRouter } from 'next/navigation'

const Register: React.FC = () => {
  const initialValues: Signup = { firstname: '', lastname: '', email: '', phonenumber: '', password: '', admin: false };
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();
  const getAuthUser = async (values: Signup, formikHelpers: FormikHelpers<Signup>) => {
    console.log({values})
    try {
      // fetch with rtk query
      const data = await registerUser(values).unwrap();
      console.log(data);
      if (data?.status === 200) {
        // do some thing
        await storeAuthToken(data?.response?.data?.token);
        router.push("/user");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errors) {
        error?.data?.errors?.map((item: SignupError) => {
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
    <div className="p-12 ">
      <div className='text-xl p-3' >ثبت نام</div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values: Signup, formikHelpers: FormikHelpers<Signup>) => {
          // same shape as initial values
          // console.log(values);
          getAuthUser(values, formikHelpers);
        }}
      >
        {({ errors, touched }) => (
          <RegisterForm loading={isLoading} errors={errors} touched={touched} />
        )}
      </Formik>
        <p className='p-3'>قبلا ثبت نام کرده اید <Link className='text-[#2e2798]' href={'/login'}>وارد شوید</Link></p>
    </div>
  )
}

export default Register;
