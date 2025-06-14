import * as Yup from 'yup';
import Data from '../data.json';
export const CategorySchema = Yup.object().shape({
    name: Yup.string()
        .min(3, Data.find(i => i.name === 'name')?.errors.min)
        .required(Data.find(i => i.name === 'name')?.errors.required),
});