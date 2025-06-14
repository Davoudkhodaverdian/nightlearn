"use client";
import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import RegisterForm from './form';
import { Signup } from './models/signup';
import { SignupSchema } from './signupSchema';
import fieldData from './data.json';
import Link from 'next/link';
import { useRegisterUserMutation } from '@/services/store/authApi';
import { storeAuthToken } from '@/services/cookie';
import { useRouter } from 'next/navigation'
import getValidationErrorFields from '@/services/getValidationErrorFields';
import { UserRole } from '@/services/models/userRole';
import LoginWithGoogle from '../common/loginWithGoogle';

const Register: React.FC = () => {
  const initialValues: Signup = { firstname: '', lastname: '', email: '', phonenumber: '', password: '', role: UserRole.User };
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();
  const getAuthUser = async (values: Signup, formikHelpers: FormikHelpers<Signup>) => {
    console.log({ values })
    try {
      // fetch with rtk query
      const data = await registerUser(values).unwrap();
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
        {({ errors, touched, values, handleChange, handleBlur }) => (
          <RegisterForm
            loading={isLoading}
            errors={errors}
            values={values}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        )}
      </Formik>
      <LoginWithGoogle />
      <p className='p-3'>قبلا ثبت نام کرده اید <Link className='text-[#2e2798]' href={'/login'}>وارد شوید</Link></p>
    </div>
  )
}

export default Register;
