// ProductCard.js
import React from 'react';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

import AverageRating from './AverageRating';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/singleProduct/${product._id}`);
  };


  const { dispatch } = useCart();
 
  const handleAddToCart = () => {
    // Dispatch ADD_TO_CART action with the current product data
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success('Product added to cart!',{ autoClose: 1000 });
  };
  return (
    <div className="col mb-4" style={{ margin: '5px' }}>
      <ToastContainer/>
      <div className="card shadow " style={{ height: '600px', overflow: 'auto' }}>
       
        <div onClick={handleCardClick}>
          <img
            src={product.picture}
            height={250}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        
        <div className="card-body" style={{ minHeight: '200px', overflow: 'auto' }} onClick={handleCardClick}>
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          {product.size && <h6>Size: {product.size}</h6>}
          <div className='p-2'>
            <AverageRating id={product._id} />
          </div>
        </div>

        <div className="card-footer">
          <small className="text-body-secondary" >
            <i className="fa-solid fa-cart-shopping m-2 cart-icon"  onClick={handleAddToCart}/>
          </small>
          <div>
            <h5>
            ₹ {product.price}
              <p>₹ {product.mrp} /-</p>
            </h5>
           
          </div>
        </div>
      </div>
    </div>
  );
}
