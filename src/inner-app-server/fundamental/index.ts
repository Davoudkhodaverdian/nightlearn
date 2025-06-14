import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
// make custom validationResult, change msg to message
const customValidationResult = validationResult.withDefaults({
    formatter: error => {
        const message = error.msg;
        delete error.msg;
        return { message, ...error };
    },
});
// manage object data
const transform = <T>(dataItem: T, items: (keyof T)[]) => {
    // (keyof T)[] is An array of T type property names (string)
    // (keyof T) is name (string) of T type
    let trnasformedDataItem: Partial<T> = {}; // Partial<T> is one or more of properties of T type
    items.map((item: (keyof T)) => {
        trnasformedDataItem[item] = dataItem?.[item];
    })
    return trnasformedDataItem;
}
const createToken = (id: string) => {
    let token = jwt.sign({ user_id: id }, process.env.JWT_SECRET as string);
    return token;
}
export { customValidationResult, transform, createToken };