import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import axios from 'axios';

export default function AddReview({ id, onReviewAdded }) {
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const AddReview = async (e) => {
    e.preventDefault();
  
    const requestData = {
      rating: rating,
      comments: comments,
      productId: id // Include the productId in the request data
    };
  
    const authToken = localStorage.getItem('token');
  
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    };
  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/review`, requestData, { headers });
  
      if (response.status === 200) {
        setSuccessMessage('Review submitted successfully');
        setErrorMessage('');
        setComments('');
        setRating('');
        // Trigger the callback to update reviews
        onReviewAdded();
  
        // Clear success message after 1 second
        setTimeout(() => {
          setSuccessMessage('');
        }, 1000);
      } else {
        setErrorMessage('Error submitting review');
        setSuccessMessage('');
  
        // Clear error message after 1 second
        setTimeout(() => {
          setErrorMessage('');
        }, 1000);
      }
    } catch (error) {
      setErrorMessage('Error submitting review');
      setSuccessMessage('');
  
      // Clear error message after 1 second
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
    }
  };

  return (
    <div>
      
      <form className="container d-flex justify-content-center mb-5" onSubmit={AddReview}>
        
        <div className='w-60 '>
          <h1>Write a review..</h1>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="mb-3 ">
            <label htmlFor="ratingSelect" className="form-label">
              Rating
            </label>
            <select
              className="form-control"
              id="ratingSelect"
              value={rating}
              onChange={handleRatingChange}
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <div className="form-text">Select a rating from 1 to 5.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Comment
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
         
          <button type="submit" className="btn btn-review w-100 mb-5">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
