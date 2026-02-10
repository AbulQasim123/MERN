import Book from '../models/bookModel.js'
import { deleteImage } from '../utils/image-helper.js'
import { createBookSchema, updateBookSchema } from '../utils/book-validator.js'
import BookIssue from "../models/bookIssueModel.js";

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


export const createBook = async (req, res) => {
    const { error } = createBookSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            errors: formatValidationErrors(error)
        });
    }

    if (!req.file) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            errors: {
                cover: 'Cover image is required'
            }
        });
    }

    try {
        const { title, isbn, author_id, category_id, total_copies, pages, price, published, summary, status } = req.body;
        await Book.create({ title, isbn, author: author_id, category: category_id, total_copies, pages, price, publishedDate: published, summary, coverImage: req.file.filename, status });
        res.status(201).json({
            status: true,
            message: 'Book created successfully',
        });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to create book'
        });
    }
}

export const getBook = async (req, res) => {
    try {

        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Book ID is required'
            });
        }

        const book = await Book.findById(id)
            .populate('author', 'name')
            .populate('category', 'name');

        if (!book) {
            return res.status(404).json({
                status: false,
                message: 'Book not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Book found',
            data: book
        });
    } catch (error) {
        console.error('Error getting book:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to get book'
        });
    }
}

export const getBooks = async (req, res) => {
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
                { title: { $regex: search, $options: 'i' } },
                { isbn: { $regex: search, $options: 'i' } },
            ];
        }

        const total = await Book.countDocuments(query);

        const books = await Book.find(query)
            .populate('author', { name: 1, email: 1 })
            .populate('category', { name: 1 })
            .sort({ _id: -1 })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        const booksWithAvailability = await Promise.all(
            books.map(async (book) => {
                const issuedCount = await BookIssue.countDocuments({
                    book_id: book._id,
                    status: 'issued'
                });

                return {
                    ...book,
                    issued_copies: issuedCount,
                    available_copies: book.total_copies - issuedCount
                };
            })
        );

        res.status(200).json({
            status: true,
            message: 'Books found',
            data: booksWithAvailability,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error getting books:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to get books'
        });
    }
}

export const getActiveBooks = async (req, res) => {
    try {
        const books = await Book.find(
            { status: true },
            {
                title: 1,
                total_copies: 1
            }
        )
            .sort({ createdAt: -1 })
            .lean();

        if (!books.length) {
            return res.status(404).json({
                status: false,
                message: 'Books not found'
            });
        }

        const availableBooks = await Promise.all(
            books.map(async (book) => {
                const issuedCount = await BookIssue.countDocuments({
                    book_id: book._id,
                    status: 'issued'
                });

                const available = book.total_copies - issuedCount;

                if (available <= 0) return null;

                return {
                    _id: book._id,
                    title: book.title,
                    available_copies: available
                };
            })
        );

        const filteredBooks = availableBooks.filter(Boolean);

        if (!filteredBooks.length) {
            return res.status(404).json({
                status: false,
                message: 'No books available in stock'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Active books fetched',
            data: filteredBooks
        });

    } catch (error) {
        console.error('Error getting active books:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to get books'
        });
    }
};

export const updateBook = async (req, res) => {

    const { error } = updateBookSchema.validate(req.body, { abortEarly: false });

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
                message: 'Book ID is required'
            });
        }

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                status: false,
                message: 'Book not found'
            });
        }

        const { title, isbn, author_id, category_id, total_copies, pages, price, published, summary, status } = req.body;

        const updateData = {
            title,
            isbn,
            author: author_id,
            category: category_id,
            total_copies,
            pages,
            price,
            publishedDate: published,
            summary,
            status
        };

        if (req.file) {
            deleteImage(book.coverImage);

            updateData.coverImage = req.file.filename;
        }

        await Book.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            status: true,
            message: 'Book updated successfully',
        });

    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to update book'
        });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Book ID is required'
            });
        }
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({
                status: false,
                message: 'Book not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Book deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to delete book'
        });
    }
}