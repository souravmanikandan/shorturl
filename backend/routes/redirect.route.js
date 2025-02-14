import express from 'express';
import { redirectController } from '../controllers/redirect.controller.js';
const router = express.Router();

router.get('/:urlId', redirectController);

export default router;