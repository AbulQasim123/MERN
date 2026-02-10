import Author from "../models/authorModel.js";
import Category from "../models/categoryModel.js";
import Book from "../models/bookModel.js";
import Member from "../models/memberModel.js";
import BookIssue from "../models/bookIssueModel.js";

export const getDashboardData = async (req, res) => {
    try {
        const authorsCount = await Author.countDocuments();
        const categoriesCount = await Category.countDocuments();
        const booksCount = await Book.countDocuments();
        const membersCount = await Member.countDocuments();
        const totalBookIssuesCount = await BookIssue.countDocuments();
        const issueBookCount = await BookIssue.countDocuments({ status: 'issued' });
        const returnBookCount = await BookIssue.countDocuments({ status: 'returned' });

        const totalFine = await BookIssue.aggregate([
            {
                $group: {
                    _id: null,
                    totalFine: { $sum: '$fine' }
                }
            }
        ]);
        const totalFineAmount = totalFine[0]?.totalFine || 0;
        res.status(200).json({
            status: true,
            message: 'Dashboard data fetched successfully',
            data: {
                authorsCount,
                categoriesCount,
                booksCount,
                membersCount,
                totalBookIssuesCount,
                issueBookCount,
                returnBookCount,
                totalFineAmount
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to fetch dashboard data'
        });
    }
};
