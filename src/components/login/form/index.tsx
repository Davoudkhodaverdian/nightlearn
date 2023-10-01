import { Field, Form ,FormikTouched,FormikErrors } from "formik";
import { Signin } from "../models/signin";
import Loading from "@/components/loading";



interface Props {
    errors: FormikErrors<Signin>
    touched: FormikTouched<Signin>
    loading: boolean
}

const LoginForm : React.FC<Props> = ({errors, touched,loading})=>{

return (
    <Form>
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
        
        <button disabled={loading} className={`p-3 text-white rounded bg-[#0c056d] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70`}
         type="submit">
            <div className="flex">
                <div>ورود</div>
                <div>{loading && <Loading/>}</div>
            </div>
        </button>
    </div>
</Form>
)
}

export default LoginForm;