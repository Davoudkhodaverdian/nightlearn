import React, { useEffect, useState } from "react";
import styles from './categoryField.module.scss';
import customFetch from "@/services/customFetch";
import { Course } from "@/services/models/course";
import { Category } from "@/services/models/category";
import { FormikErrors, FormikTouched } from "formik";
import { ExtraData } from "@/services/models";
interface Props {
    handleBlur: (e: React.FocusEvent<any>) => void
    handleChange: (e: React.ChangeEvent<any>) => void
    values: Course
    errors: FormikErrors<Course>
    touched: FormikTouched<Course>
}
const CategoryField: React.FC<Props> = ({ handleBlur, handleChange, errors, touched, values }) => {

    const [categoriesData, setCategoriesData] = useState({ data: null, loading: true });
    const getCategories = async () => {
        const response = await customFetch('categories', { method: 'GET' });
        setCategoriesData({ loading: false, data: response?.categories || null })
        console.log('getCategories', { response });

    };
    useEffect(() => {
        getCategories();
    }, [])

    return (
        <>
            <div className={`p-1 w-full relative ${styles.select_part}`}>
                <label className='p-1 pb-3 block' htmlFor="category">دسته بندی دوره آموزشی</label>
                <div className='w-full relative'>
                    <select id="category" name="category"
                        className={`${styles.select} shadow border-[#9681ff] w-full border-[1px] border-solid p-[10px] rounded-[5px] pl-8 appearance-none`}
                        onChange={handleChange} onBlur={handleBlur} value={values.category}
                    >
                        {categoriesData.loading ? (
                            <option value="">در حال بارگذاری ...</option>
                        ) :
                            categoriesData?.data ?
                                <>
                                    <option value={''}>...</option>
                                    {
                                        (categoriesData?.data as (Category & ExtraData)[])?.map((value, index) => (
                                            <option key={value?._id} value={value?._id}>
                                                {`${value?.name}`}
                                            </option>
                                        ))
                                    }
                                </>
                                : <option value={''}>موردی وجود ندارد</option>
                        }
                    </select>
                    <svg className={`${styles.dropdown} w-2.5 h-2.5 ms-3 absolute inset-y-0 left-2 flex items-center justify-center pointer-events-none`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </div>
                {errors.category && touched.category && <div className='text-red-600 p-2'>{errors.category}</div>}
            </div>
        </>
    )
}
export default CategoryField;