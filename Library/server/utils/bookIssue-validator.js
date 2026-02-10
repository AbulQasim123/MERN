import Joi from "joi";

const createBookIssueSchema = Joi.object({
    book_id: Joi.string().required().messages({
        'string.empty': 'Book ID cannot be empty',
        'string.min': 'Book ID must be at least 3 characters',
        'string.max': 'Book ID must be at most 30 characters'
    }),
    member_id: Joi.string().required().messages({
        'string.empty': 'Member ID cannot be empty',
        'string.min': 'Member ID must be at least 10 characters'
    }),
    issue_date: Joi.date().required().messages({
        'date.empty': 'Issue date cannot be empty',
        'date.min': 'Issue date must be at least 10 characters'
    }),
    return_date: Joi.date().required().messages({
        'date.empty': 'Return date cannot be empty',
        'date.min': 'Return date must be at least 10 characters'
    })
})

const updateBookIssueSchema = Joi.object({
    book_id: Joi.string().required().messages({
        'string.empty': 'Book ID cannot be empty',
        'string.min': 'Book ID must be at least 3 characters',
        'string.max': 'Book ID must be at most 30 characters'
    }),
    member_id: Joi.string().required().messages({
        'string.empty': 'Member ID cannot be empty',
        'string.min': 'Member ID must be at least 10 characters'
    }),
    issue_date: Joi.date().required().messages({
        'date.empty': 'Issue date cannot be empty',
        'date.min': 'Issue date must be at least 10 characters'
    }),
    return_date: Joi.date().required().messages({
        'date.empty': 'Return date cannot be empty',
        'date.min': 'Return date must be at least 10 characters'
    })
})

export { createBookIssueSchema, updateBookIssueSchema }