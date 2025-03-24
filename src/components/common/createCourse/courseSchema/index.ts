import * as Yup from 'yup';
import Data from './data.json';
const enRegExp = /^[a-zA-Z0-9]+$/; // Validation for English Letters and Numbers Only
export const CourseSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, Data?.find(i => i.name === 'title')?.errors?.min)
        .max(2, Data?.find(i => i.name === 'title')?.errors?.max)
        .required(Data.find(i => i.name === 'title')?.errors.required),
    name: Yup.string()
        .min(2, Data.find(i => i.name === 'name')?.errors.min)
        .required(Data.find(i => i.name === 'name')?.errors.required)
        .matches(enRegExp, Data.find(i => i.name === 'name')?.errors.en),
    price: Yup.string()
        .required(Data.find(i => i.name === 'price')?.errors.required),
});