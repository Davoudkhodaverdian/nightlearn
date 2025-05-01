import { body, ValidationChain } from 'express-validator';
import { ICourse } from '../mongooose/models/course';

const requiredCourseData: (keyof ICourse)[] = [
    'name', 'title', 'price', 'description','image', 'category', 'teacher', "episodes", "createdAt", "updatedAt", '_id'
]
const validators: ValidationChain[] = [
    // if we dont have withMessage property,the message is defualt
    body('name').notEmpty().withMessage('name is required')
        .isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
    body('title').notEmpty().withMessage('title is required')
        .isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
    body('price').notEmpty().withMessage('price is required')
        .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
        .isInt().withMessage('must be just number'),
    body('category').notEmpty().withMessage('category is required'),
    body('teacher').notEmpty().withMessage('teacher is required'),
]

export { validators, requiredCourseData };