import Joi from "joi";

const createCategorySchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name must be at most 30 characters'
    }),
    description: Joi.string().min(10).required().messages({
        'string.empty': 'Description cannot be empty',
        'string.min': 'Description must be at least 10 characters'
    }),
    status: Joi.boolean().required().messages({
        'boolean.empty': 'Status cannot be empty',
        'boolean.base': 'Status must be a boolean'
    })
})

const updateCategorySchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name must be at most 30 characters'
    }),
    description: Joi.string().min(10).required().messages({
        'string.empty': 'Description cannot be empty',
        'string.min': 'Description must be at least 10 characters'
    }),
    status: Joi.boolean().required().messages({
        'boolean.empty': 'Status cannot be empty',
        'boolean.base': 'Status must be a boolean'
    })
})

export { createCategorySchema, updateCategorySchema }