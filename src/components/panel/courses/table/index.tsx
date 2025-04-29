"use client";


import { Course } from "@/services/models/course";
import React from "react";

interface Props {
  data: Partial<Course>[]
}

const Table: React.FC<Props> = ({ data }) => {

  return (
    <div className="p-4 overflow-x-auto">
      <table className=" bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-6 py-3 text-gray-700">ردیف</th>
            <th className="px-6 py-3 text-gray-700">نام دوره آموزشی</th>
            <th className="px-6 py-3 text-gray-700">عنوان انگلیسی دوره آموزشی</th>
            <th className="px-6 py-3 text-gray-700">دسته بندی دوره آموزشی</th>
            <th className="px-6 py-3 text-gray-700">ویرایش</th>
            <th className="px-6 py-3 text-gray-700">حذف</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((course, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 text-gray-900">{course.title}</td>
              <td className="px-6 py-4 text-gray-900">{course.name}</td>
              <td className="px-6 py-4 text-gray-900">{course.category}</td>
              <td className="px-6 py-4 text-gray-900">ویرایش</td>
              <td className="px-6 py-4 text-gray-900">حذف</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Table;
