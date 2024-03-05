// ProductCard.js
import React from 'react';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

import AverageRating from './AverageRating';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/singleProduct/${product._id}`);
  };

  return (
    <div className="col mb-4" style={{ margin: '5px' }}>
      <div className="card shadow " style={{ height: '600px', overflow: 'auto' }}>
        <div onClick={handleCardClick}>
          <img
            src={product.picture}
            height={250}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        
        <div className="card-body" style={{ minHeight: '200px', overflow: 'auto' }}>
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <div className='p-2'>
            <AverageRating id={product._id} />
          </div>
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
