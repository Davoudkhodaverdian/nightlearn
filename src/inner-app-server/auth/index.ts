import { IUser } from "../mongooose/models/user";

const requiredUserData: (keyof IUser)[] = [
    'firstname', 'lastname', 'email', "phonenumber", "roles", "createdAt", "updatedAt", '_id'
]

export { requiredUserData };
