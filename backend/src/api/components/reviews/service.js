import mongoose from 'mongoose';
import Reviews from './model.js';
const ObjectId = mongoose.Types.ObjectId;

export const addReviewToDb = async (data) => {
  try {
    if (!data) return { error: 'Invalid Data' };
    const review = await Reviews.create(data);
    return review;
  } catch (err) {
    console.error(err.message);
    return { error: err.message };
  }
};

export const fetchReviewsFromDb = async (id, filter) => {
  try {
    let review = null;
    if (id) review = await Reviews.findOne({ _id: new ObjectId(id) });
    else {
      let sort = -1;
      if (filter?.sortOrder) sort = sort;
      review = await Reviews.find({}).sort({ updatedAt: sort });

      if (filter?.search) {
        review = review
          .map((item) => {
            let search = new RegExp(`${filter.search}`, 'i');
            if (item?.title.match(search)) return item;
            if (item?.content.match(search)) return item;
          })
          .filter((item) => item);
      }
    }
    return review;
  } catch (err) {
    console.error(err.message);
    return { error: err.message };
  }
};

export const updateReviewInDb = async (id, data) => {
  try {
    if (!data) return { error: 'Invalid Data' };
    const review = await Reviews.findOneAndUpdate(
      { _id: new ObjectId(id) },
      data,
      {
        new: true,
      }
    );
    return review;
  } catch (err) {
    console.error(err.message);
    return { error: err.message };
  }
};

export const deleteReviewFromDb = async (id) => {
  try {
    const review = await Reviews.deleteOne({ _id: new ObjectId(id) });
    return review;
  } catch (err) {
    console.error(err.message);
    return { error: err.message };
  }
};
