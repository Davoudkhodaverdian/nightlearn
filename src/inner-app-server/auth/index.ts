import { IUser } from "../mongooose/models/user";

const requiredUserData: (keyof IUser)[] = [
    'firstname', 'lastname', 'email', "phonenumber", "admin", "createdAt", "updatedAt"
]

export { requiredUserData };
