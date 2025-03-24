"use client";
import React, { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Signin } from './../models/signin';
import { LoginSchema } from './../loginSchema';
import LoginForm from './../form';
import Link from 'next/link';
import { LoginError } from './../models/signinError';
import Data from './../data.json';



const Login: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const initialValues: Signin = { email: '', phoneNumber: '', password: '' };
    console.log("Login")

    const getAuthUser = async (values: Signin, formikHelpers: FormikHelpers<Signin>) => {

        try {
            setLoading(true);
            // using fetch start
            const result = await fetch('http://localhost:9000/api/auth/login', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(values), // body data type must match "Content-Type" header
            });
            const data = await result.json();
            // using fetch end
            setLoading(false);

            console.log(data);

            if (data?.status === 200) {
                // do some thing

            } else if (data?.errors) {
                data?.errors?.map((item: LoginError) => {
                    const field = Data.find(i => i?.name === item?.path) ? item?.path : "password";
                    formikHelpers.setFieldError(field, item?.message)
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
    return (
        <div className="p-12 ">
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
                    <LoginForm loading={loading} errors={errors} touched={touched} />
                )}
            </Formik>
            <div className='p-3' >
                <Link href={'/register'}>ثبت نام کنید</Link>
            </div>
        </div>
    )
}

export default Login;
