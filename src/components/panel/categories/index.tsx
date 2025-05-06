"use client";
import React from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { CategorySchema } from "./categorySchema";
import getValidationErrorFields from "@/services/getValidationErrorFields";
import fieldData from './data.json';
import { categoryApi, useCreateCategoryMutation } from "@/services/store/categoryApi";
import { Category } from "@/services/models/category";
import CategoryList from "./categoryList";
import Loading from "@/components/common/loading";
import { useAppDispatch } from "@/services/store/hooks";
import { setToast } from "@/services/store/toast/actions";

const Categories: React.FC = () => {

    const initialValues: Category = { name: "" };
    const [createCategory, { isLoading }] = useCreateCategoryMutation();
    const dispatch = useAppDispatch();
    const handleCreateCategory = async (values: Category, formikHelpers: FormikHelpers<Category>) => {
        console.log({ values })
        try {
            // fetch with rtk query
            const data = await createCategory(values).unwrap();
            console.log(data);
            if (data?.status === 200) {
                // do some thing
                dispatch(categoryApi.util.resetApiState());
                setToast({ open: true, text: "دسته بندی دوره آموزشی با موفقیت ایجاد شد" });
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
            <CategoryList />
            <Formik
                initialValues={initialValues}
                validationSchema={CategorySchema}
                onSubmit={(values: Category, formikHelpers: FormikHelpers<Category>) => {
                    // same shape as initial values
                    // console.log(values);
                    handleCreateCategory(values, formikHelpers);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <h2 className='my-3 text-xl'>افزودن دسته بندی دوره آموزشی</h2>
                        <div className='flex gap-2'>
                            <div className='p-1 w-full'>
                                <label className='p-1 pb-3 block' htmlFor="name">نام دسته بندی دوره آموزشی</label>
                                <Field
                                    id="name"
                                    name="name"
                                    placeholder="نام دسته بندی دوره آموزشی"
                                    type="text"
                                    className="shadow border-[#9681ff] w-full border-[1px] border-solid p-[10px] rounded-[5px]"
                                />
                                {errors.name && touched.name && <div className='text-red-600 p-2'>{errors.name}</div>}
                            </div>
                        </div>
                        <div className="flex gap-2 mt-5 p-1">
                            <button disabled={isLoading} className={`cursor-pointer p-3 text-white rounded bg-[#0c056d] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70`}
                                type="submit">
                                <div className="flex">
                                    <div>افزودن دسته بندی دوره آموزشی</div>
                                    <div>{isLoading && <Loading />}</div>
                                </div>
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default Categories;
