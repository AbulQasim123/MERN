import BookIssue from '../models/bookIssueModel.js'
import Book from "../models/bookModel.js";
import { createBookIssueSchema, updateBookIssueSchema } from '../utils/bookIssue-validator.js'
import { sendMail } from '../utils/mail-sender.js'
import Member from '../models/memberModel.js'

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

export const createBookIssue = async (req, res) => {
    const { error } = createBookIssueSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            errors: formatValidationErrors(error)
        });
    }

    try {
        const { book_id, member_id, issue_date, return_date } = req.body;
        // Check book exists
        const book = await Book.findById(book_id);
        if (!book || !book.status) {
            return res.status(400).json({
                status: false,
                message: 'Book not available'
            });
        }

        //  Check total copies
        if (book.total_copies <= 0) {
            return res.status(400).json({
                status: false,
                message: 'No copies configured for this book'
            });
        }

        // Count issued copies
        const issuedCount = await BookIssue.countDocuments({
            book_id,
            status: 'issued'
        });

        const availableCopies = book.total_copies - issuedCount;

        //  Check availability
        if (availableCopies <= 0) {
            return res.status(400).json({
                status: false,
                message: 'All copies are currently issued'
            });
        }

        // Prevent duplicate issue
        const alreadyIssued = await BookIssue.findOne({
            book_id,
            member_id,
            status: 'issued'
        });

        if (alreadyIssued) {
            return res.status(400).json({
                status: false,
                message: 'This book is already issued to this member'
            });
        }

        // Create issue
        await BookIssue.create({
            book_id,
            member_id,
            issue_date,
            return_date,
            status: 'issued'
        });

        // Fetch data
        const member = await Member.findById(member_id);

        // Send templated email
        await sendMail(
            member.email,
            'Book Issue Confirmation',
            'bookIssued',
            {
                member,
                book,
                issue_date,
                return_date,
            }
        );

        res.status(201).json({
            status: true,
            message: 'Book issued successfully',
            available_copies: availableCopies - 1
        });
    } catch (error) {
        console.error('Error creating book issue:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to create book issue'
        });
    }
}

export const getBookIssue = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Book issue ID is required'
            });
        }

        const bookIssue = await BookIssue.findById(id)
            .populate('book_id', { title: 1, isbn: 1 })
            .populate('member_id', { name: 1, email: 1, phone: 1, address: 1, profile: 1 })
            .sort({ _id: -1 })
            .sort({ createdAt: -1 });

        if (!bookIssue) {
            return res.status(404).json({
                status: false,
                message: 'Book not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Book issue found',
            data: bookIssue
        });
    } catch (error) {
        console.error('Error getting book issue:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to get book issue'
        });
    }
}

export const getBookIssues = async (req, res) => {
    try {
        let { page = 1, limit = 10, search = '' } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const matchStage = {};

        if (search && search.trim() !== '') {
            matchStage.$or = [
                { 'book.title': { $regex: search, $options: 'i' } },
                { 'book.isbn': { $regex: search, $options: 'i' } },
                { 'member.name': { $regex: search, $options: 'i' } },
                { 'member.email': { $regex: search, $options: 'i' } },
                { 'member.phone': { $regex: search, $options: 'i' } },
            ];
        }

        const pipeline = [
            /* ---------- BOOK ---------- */
            {
                $lookup: {
                    from: 'books',
                    localField: 'book_id',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            { $unwind: '$book' },

            /* ---------- MEMBER ---------- */
            {
                $lookup: {
                    from: 'members',
                    localField: 'member_id',
                    foreignField: '_id',
                    as: 'member'
                }
            },
            { $unwind: '$member' },

            /* ---------- SEARCH ---------- */
            ...(search ? [{ $match: matchStage }] : []),

            /* ---------- SORT ---------- */
            { $sort: { createdAt: -1 } },

            /* ---------- ONLY REQUIRED FIELDS ---------- */
            {
                $project: {
                    issue_date: 1,
                    status: 1,
                    return_date: 1,
                    expected_return_date: 1,
                    late_days: 1,
                    fine: 1,
                    createdAt: 1,

                    book_id: {
                        _id: '$book._id',
                        title: '$book.title',
                        isbn: '$book.isbn'
                    },

                    member_id: {
                        _id: '$member._id',
                        name: '$member.name',
                        email: '$member.email',
                        phone: '$member.phone',
                        address: '$member.address',
                        profile: '$member.profile'
                    }
                }
            },

            /* ---------- PAGINATION ---------- */
            {
                $facet: {
                    data: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit }
                    ],
                    meta: [
                        { $count: 'total' }
                    ]
                }
            }
        ];

        const result = await BookIssue.aggregate(pipeline);

        const data = result[0].data;
        const total = result[0].meta[0]?.total || 0;

        res.status(200).json({
            status: true,
            message: 'Book issues found',
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Failed to get book issues'
        });
    }
};


export const updateBookIssue = async (req, res) => {

    const { error } = updateBookIssueSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation error',
            errors: formatValidationErrors(error)
        });
    }

    try {
        const { id } = req.query

        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Book ID is required'
            });
        }

        const bookIssue = await BookIssue.findById(id);

        if (!bookIssue) {
            return res.status(404).json({
                status: false,
                message: 'Book issue not found'
            });
        }

        const { book_id, member_id, issue_date, return_date } = req.body;

        const updateData = {
            book_id,
            member_id,
            issue_date,
            return_date
        };

        await BookIssue.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            status: true,
            message: 'Book issue updated successfully',
        });

    } catch (error) {
        console.error('Error updating book issue:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to update book issue'
        });
    }
};

export const deleteBookIssue = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Book ID is required'
            });
        }
        const bookIssue = await BookIssue.findByIdAndDelete(id);
        if (!bookIssue) {
            return res.status(404).json({
                status: false,
                message: 'Book issue not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Book issue deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting book issue:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to delete book issue'
        });
    }
}

export const returnBookIssue = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Book ID is required'
            });
        }
        const bookIssue = await BookIssue.findById(id);
        if (!bookIssue) {
            return res.status(404).json({
                status: false,
                message: 'Book issue not found'
            });
        }
        if (bookIssue.status === 'returned') {
            return res.status(400).json({
                status: false,
                message: 'Book already returned'
            });
        }

        const today = new Date();

        const actualReturnDate = new Date(today.setHours(0, 0, 0, 0));
        const expectedReturnDate = new Date(
            bookIssue.return_date.setHours(0, 0, 0, 0)
        );

        let lateDays = 0;
        let fine = 0;


        if (actualReturnDate > expectedReturnDate) {
            const diffTime = actualReturnDate - expectedReturnDate;
            lateDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            fine = lateDays * 10;
        }


        bookIssue.expected_return_date = actualReturnDate;
        bookIssue.late_days = lateDays;
        bookIssue.fine = fine;
        bookIssue.status = 'returned';

        await bookIssue.save();

        res.status(200).json({
            status: true,
            message: 'Book returned successfully',
            data: {
                late_days: lateDays,
                fine: fine
            }
        });
    } catch (error) {
        console.error('Error returning book issue:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to return book issue'
        });
    }
};