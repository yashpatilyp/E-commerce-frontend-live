import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';


export default function DisplayReviews({ id, onReviewAdded}) {
  const [reviews, setReviews] = useState([]);
  
  const [loading, setLoading] = useState(true);
console.log(id)
  const fetchReviews = async () => {
    try {
      // Assuming you have an API endpoint for fetching reviews
      const response = await axios.get(`${API_BASE_URL}/api/reviews/${id}`);
      setReviews(response.data.reviews);
      console.log(response.data.reviews)
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {

    // Call the fetchReviews function when the component mounts
    fetchReviews();
  }, [id,onReviewAdded]);

  const generateStarRating = (ratingText) => {
    const rating = parseInt(ratingText, 10);
    return Array.from({ length: 5 }, (_, index) => (index + 1 <= rating ? '⭐️' : '☆')).join('');
  };


  return (
    <>
   
       {reviews && (
        <div className="container text-center mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
      
      <h1 style={{ position: 'sticky', top: '0', backgroundColor: '#fff', zIndex: '1000' }}>Reviews</h1>
      {loading && (
        <div className="text-center mt-5">
          <i className="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
          <p>Loading...</p>
        </div>
      )}
      
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="card mb-3" >
            <div className="card-body" style={{marginLeft:"auto",marginRight:"auto"}}>
              <h3 className="card-title">{review.author.firstname} {review.author.lastname}</h3>
              <p className="card-text">Rating: {generateStarRating(review.rating)}</p>
              <h5 className="card-subtitle mb-2 text-muted">Date: {new Date(review.createdAt).toLocaleDateString()}</h5>
              <p className="card-text">Comments: {review.comments}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info" role="alert">
          No reviews available.
        </div>
      )}
    </div>
       )}
    </>

  
  );
}
