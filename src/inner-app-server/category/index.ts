import { body, ValidationChain } from 'express-validator';
import { ICategory } from '../mongooose/models/category';

const requiredCategoryData: (keyof ICategory)[] = ['name', "createdAt", "updatedAt", '_id']

const validators: ValidationChain[] = [
    // if we dont have withMessage property,the message is defualt
    body('name').notEmpty().withMessage('name is required')
        .isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
]

export { validators, requiredCategoryData };