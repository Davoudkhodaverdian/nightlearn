import { Field, Form, FormikTouched, FormikErrors, } from "formik";

import Loading from "@/components/common/loading";
import TeacherField from "./teacherField";
import { Course } from "@/services/models/course";
import CategoryField from "./categoryField";

interface Props {
    errors: FormikErrors<Course>
    touched: FormikTouched<Course>
    loading: boolean
    handleClose?: () => void
    handleBlur: (e: React.FocusEvent<any>) => void
    handleChange: (e: React.ChangeEvent<any>) => void
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<Course>>
    values: Course
}

const CourseForm: React.FC<Props> = ({ errors, touched, loading, setFieldValue, handleClose, handleBlur, handleChange, values }) => {

    return (
        <Form>
            <h2 className='my-3 text-xl'>افزودن دوره آموزشی</h2>
            <div className='flex gap-2'>
                <div className='p-1 w-full'>
                    <label className='p-1 pb-3 block' htmlFor="name">نام دوره آموزشی</label>
                    <Field
                        id="name"
                        name="name"
                        placeholder="نام دوره آموزشی"
                        type="text"
                        className="shadow border-[#9681ff] w-full border-[1px] border-solid p-[10px] rounded-[5px]"
                    />
                    {errors.name && touched.name && <div className='text-red-600 p-2'>{errors.name}</div>}
                </div>
                <div className='p-1 w-full'>
                    <label className='p-1 pb-3 block' htmlFor="title">عنوان دوره آموزشی</label>
                    <Field
                        id="title"
                        name="title"
                        placeholder="عنوان دوره آموزشی"
                        type="text"
                        className="shadow border-[#9681ff] w-full border-[1px] border-solid p-[10px] rounded-[5px]"
                    />
                    {errors.title && touched.title && <div className='text-red-600 p-2'>{errors.title}</div>}
                </div>
            </div>
            <div className='p-1 w-full'>
                <label className='p-1 pb-3 block' htmlFor="description">درباره دوره</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="درباره دوره"
                    className="shadow border-[#9681ff] border-[1px] border-solid p-[10px] rounded-[5px] w-full min-h-[110px]"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                ></textarea>
            </div>
            <div className='flex gap-2'>
                <CategoryField
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    touched={touched}
                />
                <div className='p-1 w-full'>
                    <label className='p-1 pb-3 block' htmlFor="price">{'قیمت دوره آموزشی (تومان)'}</label>
                    <Field
                        id="price"
                        name="price"
                        placeholder="قیمت دوره آموزشی"
                        type="text"
                        className="shadow border-[#9681ff] w-full border-[1px] border-solid p-[10px] rounded-[5px]"
                    />
                    {errors.price && touched.price && <div className='text-red-600 p-2'>{errors.price}</div>}
                </div>
            </div>
            <TeacherField
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                errors={errors}
                touched={touched}
            />
            <div className="flex gap-2 mt-5 p-1">
                <button disabled={loading} className={`cursor-pointer p-3 text-white rounded bg-[#0c056d] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70`}
                    type="submit">
                    <div className="flex">
                        <div>افزودن دوره</div>
                        <div>{loading && <Loading />}</div>
                    </div>
                </button>
                {
                    handleClose &&
                    <button onClick={handleClose} className={`cursor-pointer p-3 text-white rounded bg-[#0c056d] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70`}
                        type="button">
                        <div className="flex"><div>انصراف</div></div>
                    </button>
                }
            </div>
        </Form>
    )
}

export default CourseForm;