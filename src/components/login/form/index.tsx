import { Field, Form, FormikTouched, FormikErrors } from "formik";
import { Signin } from "../models/signin";
import Loading from "@/components/common/loading";



interface Props {
    errors: FormikErrors<Signin>
    touched: FormikTouched<Signin>
    loading: boolean
}

const LoginForm: React.FC<Props> = ({ errors, touched, loading }) => {

    return (
        <Form>
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
                    <Field
                        id="password"
                        name="password"
                        placeholder="رمز عبور"
                        type="password"
                        className="shadow border-[#9681ff] border-[1px] border-solid p-[10px] rounded-[5px]"
                    />
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
            <div className="flex flex-row-reverse justify-end">
                <button disabled={loading} className={`cursor-pointer p-3 text-white rounded bg-[#0c056d] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70`}
                    type="submit">
                    <div className="flex">
                        <div>ورود</div>
                        <div>{loading && <Loading />}</div>
                    </div>
                </button>
            </div>
        </Form >
    )
}

export default LoginForm;