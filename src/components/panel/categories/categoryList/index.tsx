"use client";
import React, { useEffect } from "react";
import { useGetCategoriesQuery } from "@/services/store/categoryApi";
import Loading from "@/components/common/loading";
import { Category } from "@/services/models/category";
import { ExtraData } from "@/services/models";

const CategoryList: React.FC = () => {

    const { data, isLoading, error } = useGetCategoriesQuery('');

    return (
        <>
            <section>
                <h2 className='my-3 text-xl'>دسته بندی ها</h2>
                {
                    isLoading ?
                        <Loading />
                        : data?.categories?.length > 0 ?
                            data?.categories?.map((category: Category & ExtraData) => <div key={category?._id} >{category?.name}</div>)
                            : <div>در حال حاضر دسته نبدی وجود ندارد</div>
                }
            </section>
        </>
    )
}
export default CategoryList;
