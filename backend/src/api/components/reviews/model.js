import mongoose from 'mongoose';
import db from '../../connection/db.js';

const { Schema } = mongoose;

mongoose.Promise = Promise;

const reviewSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    collection: 'reviews',
    timestamps: true,
  }
);

export default db.model('reviews', reviewSchema);
