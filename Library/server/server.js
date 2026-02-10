import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import apiRoute from "./routes/apiRoute.js";
import { connectMongoDB } from "./config/connection.js";
import cors from 'cors';
const app = express();
app.use('/uploads', express.static('public/uploads'));

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

connectMongoDB(process.env.MONGO_URI);

app.use("/api", apiRoute);

const port = process.env.PORT || 2025;
app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`)
});
