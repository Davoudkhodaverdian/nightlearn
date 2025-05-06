"use client";
import React from "react";
import ModalCmp from "@/components/common/modalCmp";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import Link from "next/link";
import CreateCourse from "@/components/common/createCourse";

const AddCourses: React.FC = () => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const open = Boolean(searchParams.has("create-course"));
  const handleClickOpen = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has('create-course')) {
      router.push(`${pathname}?${params.size === 0 ? 'create-course' : params + '&create-course'}`, { scroll: false });
    }
  };
  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('create-course')
    router.push(pathname + '?' + params, { scroll: false });
  };

  return (
    <>
      <button className="cursor-pointer m-6 text-white rounded bg-[#0c056d] px-3 py-2 " type="button" onClick={handleClickOpen}>اضافه کردن دوره +</button>
      <div>
        <Link className="m-6" href={'/panel/courses/create-course'}>رفتن به صفحه جداگانه برای اضافه کردن دوره</Link>
      </div>
      {
        open &&
        <ModalCmp open={open} handleClose={handleClose}>
          <CreateCourse handleClose={handleClose} />
        </ModalCmp>}
    </>
  )
}
export default AddCourses;
