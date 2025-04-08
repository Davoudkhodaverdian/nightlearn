import { UserRole } from "@/services/models/userRole";

export interface Signup {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    password:string;
    role: UserRole
  }