"use client";
import React, { useEffect, useRef, useState } from "react";
import Table from "./table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PaginationCmp from "./paginationCmp";
import AddCourses from "./add";
import { useGetCoursesQuery } from "@/services/store/courseApi";
import { Course } from "@/services/models/course";

const Courses: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");
  const rowsPerPage = parseInt(searchParams.get("rows-per-page") || "2");
  const pageTopRef = useRef<HTMLDivElement>(null);

  const [coursesData, setCoursesData] = useState([]);
  const paginatedData = coursesData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const countPage = Math.ceil(coursesData.length / rowsPerPage);

  useEffect(() => {
    if (paginatedData.length === 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      params.set('rows-per-page', "2");
      router.push(pathname + '?' + params, { scroll: false });
    }
  }, []);


  const { data, isLoading, error } = useGetCoursesQuery('');
  useEffect(() => {
    if (!isLoading) {
      console.log('GetCourses', { data, error });
      if (data?.courses) setCoursesData(data?.courses);

    }
  }, [isLoading])

  return (
    <>
      <h2 ref={pageTopRef} className="p-4">دوره های آموزشی</h2>
      <AddCourses />
      <Table data={paginatedData} />
      <PaginationCmp countPage={countPage} pageTopRef={pageTopRef} />
    </>
  )
}
export default Courses;
