import { Field, Form, FormikTouched, FormikErrors } from "formik";
import { Signup } from "../models/signup";
import Loading from "@/components/common/loading";

interface Props {
    errors: FormikErrors<Signup>
    touched: FormikTouched<Signup>
    loading: boolean
}
const RegisterForm: React.FC<Props> = ({ errors, touched, loading }) => {

    return (
        <Form>
            <div className='flex gap-2'>
                <div className='p-1'>
                    <label className='p-1 pb-3 block' htmlFor="firstName">نام</label>
                    <Field className="shadow border-[#9681ff] border-[1px] border-solid p-[10px] rounded-[5px]" id="firstName" name="firstName" placeholder="نام" />
                    {errors.firstName && touched.firstName && <div className='text-red-600 p-2'>{errors.firstName}</div>}
                </div>
                <div className='p-1'>
                    <label className='p-1 pb-3 block' htmlFor="lastName">نام خانوادگی</label>
                    <Field className="shadow border-[#9681ff] border-[1px] border-solid p-[10px] rounded-[5px]" id="lastName" name="lastName" placeholder="نام خانوادگی" />
                    {errors.lastName && touched.lastName && <div className='text-red-600 p-2'>{errors.lastName}</div>}
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
    <label className='pl-3' htmlFor="phoneNumber">شماره موبایل</label>
    <Field
    maxLength="11"
    id="phoneNumber"
    name="phoneNumber"
    placeholder="شماره موبایل"
 type="tel"
  />
  {errors.phoneNumber && touched.phoneNumber && <div className='text-red-600 p-2'>{errors.phoneNumber}</div>}
        </div> */}

            <div className='p-1'>
                <label className='p-1' htmlFor="admin">ادمین</label>
                <Field
                    id="admin"
                    name="admin"
                    placeholder="ادمین"
                    type="checkbox"
                    className=""
                />
                {errors.admin && touched.admin && <div className='text-red-600 p-2'>{errors.admin}</div>}
            </div>
            <div className="flex flex-row-reverse justify-end">
                <button className='p-3 text-white rounded bg-[#0c056d] px-3 py-2 cursor-pointer' type="submit">
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