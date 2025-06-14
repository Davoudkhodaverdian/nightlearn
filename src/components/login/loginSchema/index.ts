import * as Yup from 'yup';
import Data from '../data.json';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const LoginSchema = Yup.object().shape({
    email: Yup.string()
    .email(Data.find(i=>i.name==='email')?.errors.email)
    .required(Data.find(i=>i.name==='email')?.errors.required),
    // phonenumber: Yup.string()
    // .required(Data.find(i=>i.name==='phonenumber')?.errors.required)
    // .matches(phoneRegExp, Data.find(i=>i.name==='phonenumber')?.errors.phonenumber),
    password: Yup.string()
    .min(5, Data.find(i=>i.name==='password')?.errors.min)
    .required(Data.find(i=>i.name==='password')?.errors.required),
});