import { Field, Form, FormikTouched, FormikErrors, } from "formik";
import { Course } from "@/components/panel/models";
import Loading from "@/components/common/loading";
import styles from './form.module.scss';
interface Props {
    errors: FormikErrors<Course>
    touched: FormikTouched<Course>
    loading: boolean
    handleClose?: () => void
    handleBlur: (e: React.FocusEvent<any>) => void
    handleChange: (e: React.ChangeEvent<any>) => void
    values: Course
}

const CourseForm: React.FC<Props> = ({ errors, touched, loading, handleClose, handleBlur, handleChange, values }) => {

    return (
        <Form>
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
                <div className={`p-1 w-full relative ${styles.select_part}`}>
                    <label className='p-1 pb-3 block' htmlFor="type">نوع دوره آموزشی</label>
                    <div className='w-full relative'>
                        <select id="type" name="type" placeholder="نوع دوره آموزشی"
                            className={`${styles.select} shadow border-[#9681ff] w-full border-[1px] border-solid p-[10px] rounded-[5px] pl-8 appearance-none`}
                            onChange={handleChange} onBlur={handleBlur} value={values.type}
                        >
                            <option value={"online"}>online</option>
                            <option value={"offline"}>offline</option>
                        </select>
                        <svg className={`${styles.dropdown} w-2.5 h-2.5 ms-3 absolute inset-y-0 top-[] left-2 flex items-center justify-center pointer-events-none`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </div>
                </div>
                <div className='p-1 w-full'>
                    <label className='p-1 pb-3 block' htmlFor="price">قیمت دوره آموزشی</label>
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
            <div className="flex gap-2 mt-5 p-1">
                <button disabled={loading} className={`p-3 text-white rounded bg-[#0c056d] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70`}
                    type="submit">
                    <div className="flex">
                        <div>افزودن دوره</div>
                        <div>{loading && <Loading />}</div>
                    </div>
                </button>
                {
                    handleClose &&
                    <button onClick={handleClose} className={`p-3 text-white rounded bg-[#0c056d] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70`}
                        type="button">
                        <div className="flex"><div>انصراف</div></div>
                    </button>
                }
            </div>
        </Form>
    )
}

export default CourseForm;