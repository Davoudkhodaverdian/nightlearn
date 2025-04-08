import { IUser } from "../mongooose/models/user";

const requiredUserData: (keyof IUser)[] = [
    'firstname', 'lastname', 'email', "phonenumber", "role", "createdAt", "updatedAt"
]

export { requiredUserData };
