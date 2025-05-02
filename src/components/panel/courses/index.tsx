"use client";
import React, { useEffect, useRef } from "react";
import Table from "./table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PaginationCmp from "./paginationCmp";
import AddCourses from "./add";
import { useGetCoursesQuery } from "@/services/store/courseApi";
import Loading from "@/components/common/loading";


const Courses: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("per-page") || "10");
  const pageTopRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetCoursesQuery({ page, perPage });

  // Pagination is handled on the backend.
  const paginatedData = data && data?.courses;
  const countPage = data && data && Math.ceil(data?.total / perPage);

  // The entire data is fetched from the backend, and pagination is implemented client-side
  // const paginatedData = data && data?.courses?.slice((page - 1) * perPage, page * perPage);
  // const countPage = data && Math.ceil(data?.courses?.length / perPage);
  console.log('courses', { data })
  useEffect(() => {
    if (paginatedData?.length === 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      params.set('per-page', "10");
      router.push(pathname + '?' + params, { scroll: false });
    }
  }, [paginatedData]);

  return (
    <>
      <h2 ref={pageTopRef} className="p-4">دوره های آموزشی</h2>
      <AddCourses />
      <Table data={paginatedData} />
      {isLoading && <Loading />}
      <PaginationCmp countPage={countPage} pageTopRef={pageTopRef} />
    </>
  )
}
export default Courses;
