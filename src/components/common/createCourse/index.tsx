"use client";
import React from "react";
import { Course } from "@/components/panel/models";
import { Formik, FormikHelpers } from "formik";
import { CourseSchema } from "./courseSchema";
import CourseForm from "./form";
interface Props {
    handleClose?: () => void
}
const CreateCourse: React.FC<Props> = ({ handleClose }) => {
    const initialValues: Course = { name: "", title: "", description: "", price: "", type: "online" };

    return (
        <div className="p-4">
            <Formik
                initialValues={initialValues}
                validationSchema={CourseSchema}
                onSubmit={(values: Course, formikHelpers: FormikHelpers<Course>) => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ errors, touched, handleBlur, handleChange, values }) => (
                    <CourseForm
                        loading={false}
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