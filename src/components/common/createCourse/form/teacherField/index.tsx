import React, { useEffect, useState } from "react";
import styles from './teacherField.module.scss';
import customFetch from "@/services/customFetch";
import { Course } from "@/services/models/course";
import { User } from "@/services/models/user";

interface Props {
    handleBlur: (e: React.FocusEvent<any>) => void
    handleChange: (e: React.ChangeEvent<any>) => void
    values: Course
}
const TeacherField: React.FC<Props> = ({ handleBlur, handleChange, values }) => {

    const [teachersData, setTeachersData] = useState({ data: null, loading: true });
    const getTeachers = async () => {
        const response = await customFetch('teachers', { method: 'GET' });
        setTeachersData({ loading: false, data: response?.teachers || null })
        console.log('getTeachers', { response });
    };
    useEffect(() => {
        getTeachers();
    }, [])

    return (
        <>
            <div className={`p-1 w-full relative ${styles.select_part}`}>
                <label className='p-1 pb-3 block' htmlFor="teacher">لیست معلم ها</label>
                <div className='w-full relative'>
                    <select id="teacher" name="teacher"
                        className={`${styles.select} shadow border-[#9681ff] w-full border-[1px] border-solid p-[10px] rounded-[5px] pl-8 appearance-none`}
                        onChange={handleChange} onBlur={handleBlur} value={values.teacher}
                    >
                        {
                            teachersData?.data ?
                                (teachersData?.data as User[])?.map((value, index) => (
                                    <option key={index} value={`${value?.firstname} ${value?.lastname}`}>
                                        {`${value?.firstname} ${value?.lastname}`}
                                    </option>))
                                : <option value={''}>...</option>
                        }
                    </select>
                    <svg className={`${styles.dropdown} w-2.5 h-2.5 ms-3 absolute inset-y-0 top-[] left-2 flex items-center justify-center pointer-events-none`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </div>
            </div>
        </>
    )
}
export default TeacherField;