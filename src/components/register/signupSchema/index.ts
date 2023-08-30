import * as Yup from 'yup';
import Data from '../data.json';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, Data.find(i=>i.name==='firstName')?.errors.min)
      .required(Data.find(i=>i.name==='firstName')?.errors.required),
    lastName: Yup.string()
      .min(2, Data.find(i=>i.name==='lastName')?.errors.min)
      .required(Data.find(i=>i.name==='lastName')?.errors.required),
    email: Yup.string()
    .email(Data.find(i=>i.name==='email')?.errors.email)
    .required(Data.find(i=>i.name==='email')?.errors.required),
    // phoneNumber: Yup.string()
    // .required(Data.find(i=>i.name==='phoneNumber')?.errors.required)
    // .matches(phoneRegExp, Data.find(i=>i.name==='phoneNumber')?.errors.phoneNumber),
    password: Yup.string()
    .min(5, Data.find(i=>i.name==='password')?.errors.min)
    .required(Data.find(i=>i.name==='password')?.errors.required),
});