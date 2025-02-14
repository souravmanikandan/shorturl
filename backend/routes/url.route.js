import express from 'express';
import dotenv from 'dotenv';
import { urlController } from '../controllers/url.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
dotenv.config({ path: '../config/.env' });

const router = express.Router();

router.post('/short', verifyToken, urlController);


export default router;