"use client";
import React, { useEffect, useRef } from "react";
import { ExtraData } from "@/services/models";
import RemoveColumn from "./removeColumn";
import { CourseData } from "@/services/models/course";

interface Props {
  data: (CourseData & ExtraData)[]
}

const Table: React.FC<Props> = ({ data }) => {
  const pageTopRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pageTopRef?.current && data) {
      pageTopRef?.current?.scroll({ top: 0, behavior: 'smooth' });
    }
  }, [data])
  return (
    <>
      <div className="p-4 overflow-x-auto max-h-[270px]" ref={pageTopRef} >
        <table className=" bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-gray-700">ردیف</th>
              <th className="px-6 py-3 text-gray-700">نام دوره آموزشی</th>
              <th className="px-6 py-3 text-gray-700">عنوان انگلیسی دوره آموزشی</th>
              <th className="px-6 py-3 text-gray-700">دسته بندی دوره آموزشی</th>
              <th className="px-6 py-3 text-gray-700">حذف</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((course, index) => (
              <tr key={course?._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 text-gray-900">{course?.title}</td>
                <td className="px-6 py-4 text-gray-900">{course?.name}</td>
                <td className="px-6 py-4 text-gray-900">{course?.category?.name}</td>
                <RemoveColumn course={course} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}
export default Table;
