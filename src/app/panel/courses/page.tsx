
import Courses from "@/components/panel/page/courses";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Courses',
  description: 'Courses',
}

export default function CoursesPage() {

  return <Courses />;
}
