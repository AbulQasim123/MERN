import Joi from "joi";

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name must be at most 30 characters'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email format is invalid'
    }),

    password: Joi.string().min(5).required().messages({
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 5 characters'
    }),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email format is invalid'
    }),
    password: Joi.string().min(5).required().messages({
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 5 characters'
    }),
})

export { registerSchema, loginSchema }