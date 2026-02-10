import mongoose from "mongoose";

const bookIssueSchema = new mongoose.Schema(
    {
        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        member_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Member',
            required: true
        },
        issue_date: {
            type: Date,
            required: true
        },
        return_date: {
            type: Date,
            required: true
        },
        expected_return_date: {
            type: Date,
            required: false
        },
        status: {
            type: String,
            enum: ['issued', 'returned'],
            default: 'issued'
        },
        fine: {
            type: Number,
            default: 0
        },
        late_days: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const BookIssue = mongoose.model('BookIssue', bookIssueSchema);

export default BookIssue;
