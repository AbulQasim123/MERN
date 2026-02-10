import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        isbn: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author',
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        total_copies: {
            type: Number,
            required: true
        },
        pages: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        publishedDate: {
            type: Date,
            required: true
        },
        summary: {
            type: String,
        },
        coverImage: {
            type: String,
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Book", bookSchema);
