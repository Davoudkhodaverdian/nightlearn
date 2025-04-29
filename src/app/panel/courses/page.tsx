

import Courses from "@/components/panel/courses";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Courses',
  description: 'Courses',
}

export default function CoursesPage() {
  return <Courses />;
}
