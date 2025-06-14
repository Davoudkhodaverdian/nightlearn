import { Field, Form, FormikTouched, FormikErrors } from "formik";
import { Signup } from "../models/signup";
import Loading from "@/components/common/loading";
import styles from './form.module.scss';
import { UserRole } from "@/services/models/userRole";

interface Props {
    errors: FormikErrors<Signup>
    touched: FormikTouched<Signup>
    loading: boolean
    handleBlur: (e: React.FocusEvent<any>) => void
    handleChange: (e: React.ChangeEvent<any>) => void
    values: Signup
}
const RegisterForm: React.FC<Props> = ({ errors, touched, loading, values, handleChange, handleBlur, }) => {

    return (
        <Form>
            <div className='flex gap-2'>
                <div className='p-1'>
                    <label className='p-1 pb-3 block' htmlFor="firstname">نام</label>
                    <Field className="shadow border-[#9681ff] border-[1px] border-solid p-[10px] rounded-[5px]" id="firstname" name="firstname" placeholder="نام" />
                    {errors.firstname && touched.firstname && <div className='text-red-600 p-2'>{errors.firstname}</div>}
                </div>
                <div className='p-1'>
                    <label className='p-1 pb-3 block' htmlFor="lastname">نام خانوادگی</label>
                    <Field className="shadow border-[#9681ff] border-[1px] border-solid p-[10px] rounded-[5px]" id="lastname" name="lastname" placeholder="نام خانوادگی" />
                    {errors.lastname && touched.lastname && <div className='text-red-600 p-2'>{errors.lastname}</div>}
                </div>
            </div>
            <div className='flex gap-2'>
                <div className='p-1'>
                    <label className='p-1 pb-3 block' htmlFor="email">ایمیل</label>
                    <Field
                        id="email"
                        name="email"
                        placeholder="ایمیل"
                        type="email"
                        className="shadow border-[#9681ff] border-[1px] border-solid p-[10px] rounded-[5px]"
                    />
                    {errors.email && touched.email && <div className='text-red-600 p-2'>{errors.email}</div>}
                </div>
                <div className='p-1'>
                    <label className='p-1 pb-3 block' htmlFor="password">رمز عبور</label>
                    <Field className="shadow border-[#9681ff] border-[1px] border-solid p-[10px] rounded-[5px]" id="password" name="password" placeholder="رمز عبور" type="password" />
                    {errors.password && touched.password && <div className='text-red-600 p-2'>{errors.password}</div>}
                </div>
            </div>

            {/* <div>
    <label className='pl-3' htmlFor="phonenumber">شماره موبایل</label>
    <Field
    maxLength="11"
    id="phonenumber"
    name="phonenumber"
    placeholder="شماره موبایل"
 type="tel"
  />
  {errors.phonenumber && touched.phonenumber && <div className='text-red-600 p-2'>{errors.phonenumber}</div>}
        </div> */}

            <div className={`p-1 mb-3 w-full max-w-[212px] relative ${styles.select_part}`}>
                <label className='p-1 pb-3 block' htmlFor="role">نقش کاربر</label>
                <div className='w-full relative'>
                    <select id="role" name="role"
                        className={`${styles.select} shadow border-[#9681ff] w-full border-[1px] border-solid p-[10px] rounded-[5px] pl-8 appearance-none`}
                        onChange={handleChange} onBlur={handleBlur} value={values.role}
                    >
                        {Object.values(UserRole).map((value, index) => (<option key={index} value={value}>{value}</option>))}
                    </select>
                    <svg className={`${styles.dropdown} w-2.5 h-2.5 ms-3 absolute inset-y-0 top-[] left-2 flex items-center justify-center pointer-events-none`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </div>
            </div>
            <div className="flex flex-row-reverse justify-end m-1">
                <button className='cursor-pointer p-3 text-white rounded bg-[#0c056d] px-3 py-2' type="submit">
                    <div className="flex">
                        <div>ثبت نام</div>
                        <div>{loading && <Loading />}</div>
                    </div>
                </button>
            </div>
        </Form>
    )
}

export default RegisterForm;