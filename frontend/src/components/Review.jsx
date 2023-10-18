import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./review.css";
import { BASE_URL } from "../axios/axiosMain";

const Review = () => {
  const [reviewData, setReviewData] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (state) {
      setReviewData({ title: state.title, content: state.content });
    }
  }, []);

  const handleChange = (e) => {
    const newData = { ...reviewData, [e.target.name]: e.target.value };
    setReviewData(newData);
  };
  const handleSave = async () => {
    const { title, content } = reviewData;
    if (!title || !content) {
      alert("Title and content is required");
      return;
    }
    try {
      await axios.post(`${BASE_URL}/api/v1/reviews/create`, { title, content });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = async () => {
    const { title, content } = reviewData;
    if (!title || !content) {
      alert("Title and content is required");
      return;
    }
    try {
      await axios.put(`${BASE_URL}/api/v1/reviews/update/${id}`, {
        title,
        content,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = () => {
    navigate("/");
  };
  const handleReset = () => {
    setReviewData({ title: "", content: "" });
  };
  return (
    <div>
      <div className="review-container">
        <h2>{id ? "Edit Review" : "Create Review"}</h2>
        <div className="field-container">
          <label htmlFor="title">Review Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={reviewData?.title}
          />
        </div>
        <div className="field-container">
          <label>Review Content</label>
          <textarea
            rows={5}
            name="content"
            onChange={handleChange}
            value={reviewData?.content}
          />
        </div>
        <div className="button-container">
          {!id && (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleReset}>Reset</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          )}
          {id && (
            <>
              <button onClick={handleEdit}>Edit</button>
              <button>Delete</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
