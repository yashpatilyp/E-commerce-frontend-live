// ProductCard.js
import React from 'react';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

import AverageRating from './AverageRating';
export default function ProductCard({ product}) {
          const navigate = useNavigate();
          const handleCardClick = () => {
                    // Redirect to a new component with the product ID as a parameter
                   navigate(`/singleProduct/${product._id}`)
                  };

                  
          
  return (
          
          <div className="col mb-4 " style={{margin:"5px"}} onClick={handleCardClick}>
          <div className="card h-100 shadow">
            <img
            src={`${API_BASE_URL}/${product.picture}`}

            height={250}
              className="card-img-top"
              alt={product.name}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                {product.description}
              </p>
             <p><AverageRating id={product._id}/></p> 
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                <i className="fa-solid fa-cart-shopping m-2 cart-icon" />
              </small>
              <div>
                <h5>
                  {product.price}
                  <p>₹ {product.mrp} /-</p>
                </h5>
                <span>Size: M, L, XL</span>
              </div>
            </div>
          </div>
        </div>
        
  );
}
