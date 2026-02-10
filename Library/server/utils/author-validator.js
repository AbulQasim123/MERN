import Joi from "joi";

const createAuthorSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name must be at most 30 characters'
    }),

    email: Joi.string().email().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email format is invalid'
    }),

    short_bio: Joi.string().min(5).required().messages({
        'string.empty': 'Short bio cannot be empty',
        'string.min': 'Short bio must be at least 5 characters'
    }),
    status: Joi.boolean().required().messages({
        'boolean.empty': 'Status cannot be empty',
        'boolean.base': 'Status must be a boolean'
    })
})

const updateAuthorSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name must be at most 30 characters'
    }),

    email: Joi.string().email().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email format is invalid'
    }),

    short_bio: Joi.string().min(5).required().messages({
        'string.empty': 'Short bio cannot be empty',
        'string.min': 'Short bio must be at least 5 characters'
    }),
    status: Joi.boolean().required().messages({
        'boolean.empty': 'Status cannot be empty',
        'boolean.base': 'Status must be a boolean'
    })
})

export { createAuthorSchema, updateAuthorSchema }