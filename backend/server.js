import express from 'express';
import connectDB from './db/connectDB.js';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser'; // ✅ Move import here

dotenv.config({ path: './config/.env' });
const app = express();

const __dirname = path.resolve();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // ✅ Now it works fine
app.use(cors({
    origin: ["http://localhost:5173", "https://shorturl-bzs8.onrender.com"],
    credentials: true,
}));

// Routes
import redirectRouter from './routes/redirect.route.js';
import urlsRouter from './routes/url.route.js';

app.use('/api/auth', authRoute);
app.use('/', redirectRouter);
app.use('/api', urlsRouter);

// ✅ Fix: Serve frontend only in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}



// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`🚀 Server is running at PORT ${PORT}`);
});
