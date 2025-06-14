// This file is not using
import { UserRole } from "../userRole"

export interface User {
    firstname: string
    lastname: string
    phonenumber: string
    email: string
    password: string
    avatar: string
    bio: string
    roles: UserRole[]
    comments: []
}