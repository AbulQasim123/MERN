import Joi from "joi";

const createBookSchema = Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Title cannot be empty',
        'string.min': 'Title must be at least 3 characters',
        'string.max': 'Title must be at most 30 characters'
    }),
    isbn: Joi.string().required().messages({
        'string.empty': 'ISBN cannot be empty',
        'string.base': 'ISBN must be a string'
    }),
    author_id: Joi.string().required().messages({
        'string.empty': 'Author ID cannot be empty',
        'string.base': 'Author ID must be a string'
    }),
    category_id: Joi.string().required().messages({
        'string.empty': 'Category ID cannot be empty',
        'string.base': 'Category ID must be a string'
    }),
    pages: Joi.number().required().messages({
        'number.empty': 'Pages cannot be empty',
        'number.base': 'Pages must be a number'
    }),
    price: Joi.number().required().messages({
        'number.empty': 'Price cannot be empty',
        'number.base': 'Price must be a number'
    }),
    published: Joi.date().required().messages({
        'date.empty': 'Published Date cannot be empty',
        'date.base': 'Published Date must be a date'
    }),
    summary: Joi.string().required().messages({
        'string.empty': 'Summary cannot be empty',
        'string.base': 'Summary must be a string'
    }),
    status: Joi.boolean().optional()
}).unknown(true);

const updateBookSchema = Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Title cannot be empty',
        'string.min': 'Title must be at least 3 characters',
        'string.max': 'Title must be at most 30 characters'
    }),
    isbn: Joi.string().required().messages({
        'string.empty': 'ISBN cannot be empty',
        'string.base': 'ISBN must be a string'
    }),
    author_id: Joi.string().required().messages({
        'string.empty': 'Author ID cannot be empty',
        'string.base': 'Author ID must be a string'
    }),
    category_id: Joi.string().required().messages({
        'string.empty': 'Category ID cannot be empty',
        'string.base': 'Category ID must be a string'
    }),
    pages: Joi.number().required().messages({
        'number.empty': 'Pages cannot be empty',
        'number.base': 'Pages must be a number'
    }),
    price: Joi.number().required().messages({
        'number.empty': 'Price cannot be empty',
        'number.base': 'Price must be a number'
    }),
    published: Joi.date().required().messages({
        'date.empty': 'Published Date cannot be empty',
        'date.base': 'Published Date must be a date'
    }),
    summary: Joi.string().required().messages({
        'string.empty': 'Summary cannot be empty',
        'string.base': 'Summary must be a string'
    }),
    status: Joi.boolean().optional()
}).unknown(true);

export { createBookSchema, updateBookSchema }