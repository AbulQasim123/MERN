import Joi from "joi";

const createMemberSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name must be at most 30 characters'
    }),
    email: Joi.string().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.base': 'Email must be a string'
    }),
    phone: Joi.string().required().messages({
        'string.empty': 'Phone cannot be empty',
        'string.base': 'Phone must be a string'
    }),
    address: Joi.string().required().messages({
        'string.empty': 'Address cannot be empty',
        'string.base': 'Address must be a string'
    }),
    status: Joi.boolean().optional()
}).unknown(true);

const updateMemberSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name must be at most 30 characters'
    }),
    email: Joi.string().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.base': 'Email must be a string'
    }),
    phone: Joi.string().required().messages({
        'string.empty': 'Phone cannot be empty',
        'string.base': 'Phone must be a string'
    }),
    address: Joi.string().required().messages({
        'string.empty': 'Address cannot be empty',
        'string.base': 'Address must be a string'
    }),
    status: Joi.boolean().optional()
}).unknown(true);

export { createMemberSchema, updateMemberSchema }