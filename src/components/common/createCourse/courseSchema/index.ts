import * as Yup from 'yup';
import Data from '../data.json';
export const CourseSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, Data.find(i => i.name === 'name')?.errors.min)
        .required(Data.find(i => i.name === 'name')?.errors.required),
    title: Yup.string()
        .min(3, Data?.find(i => i.name === 'title')?.errors?.min)
        .required(Data.find(i => i.name === 'title')?.errors.required),
    price: Yup.number()
        .required(Data.find(i => i.name === 'price')?.errors.required)
        .min(5, Data?.find(i => i.name === 'price')?.errors?.min)
        .integer(Data.find(i => i.name === 'price')?.errors?.integer),
    category: Yup.string().required(Data.find(i => i.name === 'category')?.errors.required),
    teacher: Yup.string().required(Data.find(i => i.name === 'teacher')?.errors.required),
});