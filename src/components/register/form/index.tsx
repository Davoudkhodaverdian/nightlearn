import { Field, Form ,FormikTouched,FormikErrors } from "formik";
import { Signup } from "../models/signup";
import { useState } from "react";



interface Props {
    errors: FormikErrors<Signup>
    touched: FormikTouched<Signup>
    loading: boolean
}

const RegisterForm : React.FC<Props> = ({errors, touched,loading})=>{
    
return (
    <Form>
    <div className='flex '> 
    <div>
    <label className='pl-3' htmlFor="firstName">نام</label>
    <Field id="firstName" name="firstName" placeholder="نام" />
    {errors.firstName && touched.firstName && <div className='text-red-600'>{errors.firstName}</div>}
    </div>
    <div>
    <label className='pl-3' htmlFor="lastName">نام خانوادگی</label>
    <Field id="lastName" name="lastName" placeholder="نام خانوادگی" />
    {errors.lastName && touched.lastName && <div className='text-red-600'>{errors.lastName}</div>}
    </div>
        </div>
        <div>
    <label className='pl-3' htmlFor="email">ایمیل</label>
    <Field
    id="email"
    name="email"
    placeholder="ایمیل"
    type="email"
  />
  {errors.email && touched.email && <div className='text-red-600'>{errors.email}</div>}
        </div>
        {/* <div>
    <label className='pl-3' htmlFor="phoneNumber">شماره موبایل</label>
    <Field
    maxLength="11"
    id="phoneNumber"
    name="phoneNumber"
    placeholder="شماره موبایل"
 type="tel"
  />
  {errors.phoneNumber && touched.phoneNumber && <div className='text-red-600'>{errors.phoneNumber}</div>}
        </div> */}
        <div>
    <label className='pl-3' htmlFor="password">رمز عبور</label>
    <Field id="password" name="password" placeholder="رمز عبور" type="password" />
    {errors.password && touched.password && <div className='text-red-600'>{errors.password}</div>}
    </div>
    <div className="flex flex-row-reverse justify-end">
        {loading && <div className="flex items-center justify-center"><span>loading...</span></div>}
        <button className='p-3 text-white rounded bg-[#0c056d] px-3 py-2 cursor-pointer' type="submit">ثبت نام</button>
    </div>
</Form>
)
}

export default RegisterForm;