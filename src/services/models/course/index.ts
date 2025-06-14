import { ExtraData } from ".."
import { Category } from "../category"
import { User } from "../user"

export interface Course {
    name: string
    // slug: string
    title: string
    description: string
    category: string
    teacher: string
    price: string
}
export interface CourseData {
    name: string
    title: string
    // slug: string
    description: string
    category: Category & ExtraData
    teacher: User & ExtraData
    price: string
}
