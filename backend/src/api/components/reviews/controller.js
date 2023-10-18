import mongoose from 'mongoose';
import { handleError, handleResponse } from '../../helpers/requestHandler.js';
import { reviewValidator } from './validator.js';
import {
  addReviewToDb,
  fetchReviewsFromDb,
  updateReviewInDb,
  deleteReviewFromDb,
} from './service.js';
import { sendSocketData } from '../socket.js';
const ObjectId = mongoose.Types.ObjectId;

/**
 * API to create a new review
 */
export const createReview = async (req, res) => {
  try {
    const validation = await reviewValidator(req.body);
    if (validation?.error) return handleError({ res, err: validation.message });
    const review = await addReviewToDb(req.body);
    if (review?.error) return handleError({ res, err: review.error });
    const socketData = {
      review,
      eventType: 'create',
    };
    await sendSocketData(socketData);
    return handleResponse({
      res,
      data: review,
      msg: 'Review Added successfully',
    });
  } catch (err) {
    console.error(err.message);
    return handleError({ res, err: err.message });
  }
};

/**
 * API to list all reviews
 */
export const listReviews = async (req, res) => {
  try {
    const reviews = await fetchReviewsFromDb();
    if (reviews?.error) return handleError({ res, err: reviews.error });
    return handleResponse({
      res,
      data: reviews,
      msg: 'Reviews List',
    });
  } catch (err) {
    console.error(err.message);
    return handleError({ res, err: err.message });
  }
};

/**
 * API to update a review
 */
export const updateReview = async (req, res) => {
  try {
    const validation = await reviewValidator(req.body);
    if (validation?.error) return handleError({ res, err: validation.message });

    // Fetch review if it exists or not
    const { id } = req.params;
    const review = await fetchReviewsFromDb(id);
    if (!review) {
      return handleError({ res, err: 'No Reviews Found', statusCode: 400 });
    }
    if (review?.error) return handleError({ res, err: review.error });

    // Update the review
    const updatedReview = await updateReviewInDb(id, req.body);
    if (updatedReview?.error) return handleError({ res, err: review.error });
    const socketData = {
      review: updatedReview,
      eventType: 'edit',
    };
    await sendSocketData(socketData);
    return handleResponse({
      res,
      data: updatedReview,
      msg: 'Review Updated successfully',
    });
  } catch (err) {
    console.error(err.message);
    return handleError({ res, err: err.message });
  }
};

/**
 * API to delete a review
 */
export const deleteReview = async (req, res) => {
  try {
    // Fetch review if it exists or not
    const { id } = req.params;
    const review = await fetchReviewsFromDb(id);
    if (!review) {
      return handleError({ res, err: 'No Reviews Found', statusCode: 400 });
    }
    if (review?.error) return handleError({ res, err: review.error });

    // Delete the review
    const deletedReview = await deleteReviewFromDb(id);
    if (deletedReview?.error) {
      return handleError({ res, err: deletedReview.error });
    }
    const socketData = {
      review: { _id: new ObjectId(id) },
      eventType: 'delete',
    };
    await sendSocketData(socketData);
    return handleResponse({ res, msg: 'Review Deleted successfully' });
  } catch (err) {
    console.error(err.message);
    return handleError({ res, err: err.message });
  }
};
