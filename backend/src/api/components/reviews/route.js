import express from 'express';
import {
  createReview,
  listReviews,
  updateReview,
  deleteReview,
} from './controller.js';
const router = express.Router();

router.post('/create', createReview);
router.get('/list', listReviews);
router.put('/update/:id', updateReview);
router.delete('/delete/:id', deleteReview);
export default router;
