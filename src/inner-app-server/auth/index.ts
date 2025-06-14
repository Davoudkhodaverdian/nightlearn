import { IUser } from "../mongooose/models/user";

const requiredUserData: (keyof IUser)[] = [
    'firstname', 'lastname', 'email', "authProvider", "phonenumber", "roles", "createdAt", "updatedAt", '_id'
]

export { requiredUserData };
