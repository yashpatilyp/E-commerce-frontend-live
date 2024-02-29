import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default function AverageRating({ id, onReviewAdded }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  console.log(id);

  const fetchReviews = async () => {
    try {
      // API endpoint for fetching reviews
      const response = await axios.get(`${API_BASE_URL}/api/reviews/${id}`);
      setReviews(response.data.reviews);
      setLoading(false); // Set loading to false when reviews are fetched
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    // Call the fetchReviews function when the component mounts
    fetchReviews();
  }, [id, onReviewAdded]);

  //..................................................................................................................................

  const generateStarRating = (ratingText) => {
    const rating = parseInt(ratingText, 10);
    return Array.from({ length: 5 }, (_, index) => (index + 1 <= rating ? '⭐️' : '☆')).join('');
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + parseInt(review.rating, 10), 0);
    const averageRating = totalRating / reviews.length;
    return averageRating;
  };

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
         {reviews.length} Reviews
          <p>{generateStarRating(calculateAverageRating().toString())}</p>
        </>
      )}
    </div>
  );
}
