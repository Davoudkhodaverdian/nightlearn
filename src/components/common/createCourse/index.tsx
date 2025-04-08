"use client";
import React from "react";
import { Course } from "@/components/panel/models";
import { Formik, FormikHelpers } from "formik";
import CourseForm from "./form";
import fieldData from './data.json';
import { useCreateCourseMutation } from "@/services/store/courseApi";
import getValidationErrorFields from "@/services/getValidationErrorFields";
import { CourseSchema } from "./courseSchema";
interface Props {
    handleClose?: () => void
}
const CreateCourse: React.FC<Props> = ({ handleClose }) => {
    const initialValues: Course = { name: "", title: "", description: "", price: "", category: "" };

    const [createCourse, { isLoading }] = useCreateCourseMutation();
    const handleCreateCourse = async (values: Course, formikHelpers: FormikHelpers<Course>) => {
        console.log({ values })
        try {
            // fetch with rtk query
            const data = await createCourse(values).unwrap();
            console.log(data);
            if (data?.status === 200) {
                // do some thing
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
                {({ errors, touched, handleBlur, handleChange, values }) => (
                    <CourseForm
                        loading={isLoading}
                        handleClose={handleClose}
                        // formik props
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        values={values}
                    />
                )}
            </Formik>
        </div>
    )
}
export default CreateCourse