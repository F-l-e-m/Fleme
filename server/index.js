import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from'cookie-parser';
import router from './router/index.js';
import errorMiddleware from'./middleware/error-middleware.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api/v1', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch {
        console.log('Server failed to start');
    }
}

start();