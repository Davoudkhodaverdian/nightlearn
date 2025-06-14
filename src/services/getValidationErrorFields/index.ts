import { ValidationErrorFields } from "../models/ValidationErrorFields";
interface FieldData {
    name: string
    errors: {
        min?: string
        required?: string
        email?: string
        phonenumber?: string
        integer?: string
    }
}
const getValidationErrorFields = (errorsValidationData: ValidationErrorFields[], fieldData: FieldData[]) => {
    let errors: { name: string, value: string }[] = [];
    errorsValidationData?.map((item: ValidationErrorFields) => {
        const fieldName = fieldData.find(i => i?.name === item?.path) ? item?.path : "";
        if (fieldName) {
            if (!errors.find(i => i?.name === fieldName))
                errors.push({ name: fieldName, value: item?.message })
        } else {
            alert("متاسفانه خطایی رخ داده است");
            console.log({ error: item });
        }
    })
    return errors;
}
export default getValidationErrorFields;