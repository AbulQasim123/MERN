import mongoose from "mongoose";

export async function connectMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    }
}