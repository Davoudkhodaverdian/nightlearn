"use client";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import CourseForm from "./form";
import fieldData from './data.json';
import { courseApi, useCreateCourseMutation } from "@/services/store/courseApi";
import getValidationErrorFields from "@/services/getValidationErrorFields";
import { CourseSchema } from "./courseSchema";
import { Course } from "@/services/models/course";
import { useAppDispatch } from "@/services/store/hooks";
import { setToast } from "@/services/store/toast/actions";
interface Props {
    handleClose?: () => void
}

const CreateCourse: React.FC<Props> = ({ handleClose }) => {

    const initialValues: Course = { name: "", title: "", description: "", price: "", teacher: "", category: "" };
    const [createCourse, { isLoading }] = useCreateCourseMutation();
    const dispatch = useAppDispatch();
    const handleCreateCourse = async (values: Course, formikHelpers: FormikHelpers<Course>) => {
        console.log({ values })
        try {
            // fetch with rtk query
            const data = await createCourse(values).unwrap();
            console.log(data);
            if (data?.status === 200) {
                // do some thing
                dispatch(courseApi.util.resetApiState());
                setToast({ open: true, text: "دوره آموزشی با موفقیت ایجاد شد" });
                if (handleClose) handleClose();
            }
        } catch (error: any) {
            console.log(error);
            if (error?.data?.errors) {
                const errors = getValidationErrorFields(error?.data?.errors, fieldData);
                errors.map(({ name, value }) => { formikHelpers.setFieldError(name, value); });
            } else if (error?.data?.error) {
                alert(error?.data?.error?.message);
            } else {
                alert("متاسفانه خطایی رخ داده است");
                console.log(error);
            }
        }

    }
    return (
        <div className="p-4">
            <Formik
                initialValues={initialValues}
                validationSchema={CourseSchema}
                onSubmit={(values: Course, formikHelpers: FormikHelpers<Course>) => {
                    // same shape as initial values
                    // console.log(values);
                    handleCreateCourse(values, formikHelpers);
                }}
            >
                {({ errors, touched, handleBlur, handleChange, values, setFieldValue }) => (
                    <CourseForm
                        loading={isLoading}
                        handleClose={handleClose}
                        // formik props
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        values={values}
                    />
                )}
            </Formik>
        </div>
    )
}
export default CreateCourse