"use client";
import React from "react";
import { Category } from "@/services/models/category";
import { User } from "@/services/models/user";

 interface CourseData {
  name: string
  title: string
  description: string
  category: Category
  teacher: User
  price: string
  createdAt?: Date
  updatedAt?: Date
  _id?: string
}
interface Props {
  data: Partial<CourseData>[]
}

const Table: React.FC<Props> = ({ data }) => {

  return (
    <div className="p-4 overflow-x-auto max-h-[200px]">
      <table className=" bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-6 py-3 text-gray-700">ردیف</th>
            <th className="px-6 py-3 text-gray-700">نام دوره آموزشی</th>
            <th className="px-6 py-3 text-gray-700">عنوان انگلیسی دوره آموزشی</th>
            <th className="px-6 py-3 text-gray-700">دسته بندی دوره آموزشی</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((course, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 text-gray-900">{course?.title}</td>
              <td className="px-6 py-4 text-gray-900">{course?.name}</td>
              <td className="px-6 py-4 text-gray-900">{course?.category?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Table;
