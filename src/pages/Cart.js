  import React, { useState } from 'react';
  import { useCart } from '../context/CartContext';
  import { API_BASE_URL } from '../config';
  import {useNavigate } from 'react-router-dom'
  export default function Cart() {
   
    const { state: { cartItems }, dispatch } = useCart();
    const [selectedSizes, setSelectedSizes] = useState({});
    const navigate = useNavigate();
  
    const handleRemoveFromCart = (itemId) => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
      // Remove the selected size for the removed item from local storage
      updateLocalStorage(itemId, null);
    };
  
    const handleIncrementCounter = (itemId) => {
      dispatch({ type: 'INCREMENT_COUNTER', payload: itemId });
    };
  
    const handleDecrementCounter = (itemId) => {
      dispatch({ type: 'DECREMENT_COUNTER', payload: itemId });
    };
  
    const handleSizeChange = (itemId, newSize) => {
      
      setSelectedSizes((prevSizes) => ({ ...prevSizes, [itemId]: newSize }));
      // Save the selected size in local storage
      updateLocalStorage(itemId, newSize);
    };
  
    const updateLocalStorage = (itemId, newSize) => {
      const storedSizes = JSON.parse(localStorage.getItem('cartData')) || {};
      localStorage.setItem('cartData', JSON.stringify({ ...storedSizes, [itemId]: newSize }));
    };
  
    const calculateSubTotal = () => {
      return cartItems.reduce((total, item) => {
        return total + item.price * item.counter;
      }, 0);
    };
  
    const authToken = localStorage.getItem('token');
  
    const checkout = () => {
      if (authToken) {
        navigate('/checkout');
      } else {
        alert('For Checkout, Login First ');
        navigate('/login');
      }
    };
  

    let cartLength = cartItems.length; 


    return (
    
      <div style={{minHeight:"500px"}}>

        
        <div className="container mt-4 mb-4" >
          <div className="row">
            <div className="col-lg-8 cart">
              <h1 className="">Items in Cart</h1>
              {cartItems.map((item) => (
                <div key={item.id} className="row row_1">
                  {/* Product image */}
                  <div className="col-md-4 col-sm-12 mb-3">
                    <img
                      src={item.picture}
                      className="img-fluid"
                      alt="Product Image"
                    />
                  </div>
                  {/* Product details */}
                  <div className="col-md-4 col-sm-12 mb-3 text-center">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <div className="price">
                      <h5>
                        ₹ {item.price} /- 
                      </h5>
                      <div className="row mb-3 ">
    <div className="col-sm-12">
      <h6 className="mb-0">Size :</h6>
    </div>
    <div className="col-sm-12">
      <select
        className=""
        value={selectedSizes[item._id] || ''}
        onChange={(e) => handleSizeChange(item._id, e.target.value)}
       
    
      
      >
        <option value="">select size</option>
        <option value="M">M</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
        <option value="L">L</option>
      </select>
    </div>
  </div>
                    </div>
                    
                    <button
                    
                      className="noselect"
                      onClick={() => {
                        
                        handleRemoveFromCart(item._id);
                      }}
                    >
                      <span className="text">Delete</span>
                      <span className="icon">
                        <i className="fas fa-trash" />
                      </span>
                    </button>
                  </div>
                  
                  {/* Quantity control */}
                  <div className="col-md-4 col-sm-12 mb-3 text-center">
                    <button
                      className="counter-btn"
                      onClick={() => handleDecrementCounter(item._id)}
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <input type="number" value={item.counter} readOnly />
                    <button
                      className="counter-btn"
                      onClick={() => handleIncrementCounter(item._id)}
                    >
                      <i className="fas fa-plus" />
                    </button>
                  </div>
                </div>
                ))}
            </div>
            {/* Right column for order summary */}
            <div className="col-lg-4 summary">
              <h1 >Summary</h1>
              {/* Order summary details */}
              <div className="row summary-content pt-2">
                <div className="col">
                  <h5>SubTotal ({cartLength})</h5>
                </div>
                <div className="col">
                  <h5>₹ {calculateSubTotal()} /-</h5>
                </div>
                <hr />
                {/* Total cost details */}
                <div className="row check">
                  <div className="col">
                    <h5>Total</h5>
                  </div>
                  <div className="col">
                    <p>
                      <h5>₹ {calculateSubTotal()} /-</h5>
                    </p>
                  </div>
                </div>
                {/* Checkout button */}
                <div className="row check">
                  <button className="checkout-btn check" onClick={checkout}>
                    Checkout <i className="fa-sharp fa-solid fa-check" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    );
  }
