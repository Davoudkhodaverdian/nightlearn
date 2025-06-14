
import CreateCourse from "@/components/common/createCourse";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Create Course',
  description: 'Create Course',
}
export default function CreateCoursePage() {
  return (
    <CreateCourse />
  )
}
