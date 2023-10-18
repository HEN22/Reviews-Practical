import express from 'express';
import reviewRouter from './reviews/route.js';
const router = express.Router();

router.use('/reviews', reviewRouter);
export default router;
