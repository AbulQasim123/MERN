import Author from '../models/authorModel.js'
import { createAuthorSchema, updateAuthorSchema } from '../utils/author-validator.js'

const formatValidationErrors = (joiError) => {
    const errors = {};
    joiError.details.forEach((err) => {
        const field = err.path[0];
        if (!errors[field]) {
            errors[field] = err.message;
        }
    });
    return errors;
}


export const createAuthor = async (req, res) => {
    const { error } = createAuthorSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            errors: formatValidationErrors(error)
        });
    }

    try {
        const { name, email, short_bio, status } = req.body;
        const existingAuthor = await Author.findOne({ email });
        if (existingAuthor) {
            return res.status(400).json({
                status: false,
                message: 'Email already exists'
            });
        }
        await Author.create({ name, email, short_bio, status });
        res.status(201).json({
            status: true,
            message: 'Author created successfully',
        });
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to create author'
        });
    }
}

export const getAuthor = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Author ID is required'
            });
        }

        const author = await Author.findById(id, { createdAt: 0, updatedAt: 0, __v: 0 });
        if (!author) {
            return res.status(404).json({
                status: false,
                message: 'Author not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Author found',
            data: author
        });
    } catch (error) {
        console.error('Error getting author:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to get author'
        });
    }
}

export const getAuthors = async (req, res) => {
    try {
        let {
            page = 1,
            limit = 10,
            search = ''
        } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const query = {};

        if (search && search.trim() !== '') {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        const total = await Author.countDocuments(query);

        const authors = await Author.find(query, {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            status: true,
            message: 'Authors fetched',
            data: authors,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'Failed to load authors'
        });
    }
};


export const getActiveAuthors = async (req, res) => {
    try {
        const authors = await Author.find({ status: true }, { email: 0, short_bio: 0, status: 0, createdAt: 0, updatedAt: 0, __v: 0 }).sort({ _id: -1 }).sort({ createdAt: -1 });
        if (!authors.length) {
            return res.status(404).json({
                status: false,
                message: 'Authors not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Authors found',
            data: authors
        });
    } catch (error) {
        console.error('Error getting authors:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to get authors'
        });
    }
}

export const updateAuthor = async (req, res) => {
    const { error } = updateAuthorSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            errors: formatValidationErrors(error)
        });
    }

    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Author ID is required'
            });
        }
        const { name, email, short_bio, status } = req.body;
        const author = await Author.findByIdAndUpdate(id, { name, email, short_bio, status }, { new: true });
        if (!author) {
            return res.status(404).json({
                status: false,
                message: 'Author not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Author updated successfully',
        });
    } catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to update author'
        });
    }
}

export const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Author ID is required'
            });
        }
        const author = await Author.findByIdAndDelete(id);
        if (!author) {
            return res.status(404).json({
                status: false,
                message: 'Author not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Author deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to delete author'
        });
    }
}
