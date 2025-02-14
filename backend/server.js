import express from 'express';
import connectDB from './db/connectDB.js';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js'
import cors from 'cors'
dotenv.config({ path: './config/.env' });
const app = express();
// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // allow req.body
app.use(cookieParser()) //allow req.cookies
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))


import redirectRouter from './routes/redirect.route.js';
import urlsRouter from './routes/url.route.js'
import cookieParser from 'cookie-parser';


app.use('/api/auth', authRoute);
app.use('/', redirectRouter);
app.use('/api', urlsRouter);

// Server Setup
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at PORT ${PORT}`);
});