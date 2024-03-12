import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export default function Success() {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentId = searchParams.get('paymentId');

    // Fetch order details using the payment ID
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/orders/get-order-by-payment-id/${paymentId}`);
        if (response.ok) {
          const data = await response.json();
          setOrderDetails(data);
          localStorage.removeItem('cartData');
          localStorage.removeItem('postalcode');
          console.log(data)
        } else {
          console.error('Error fetching order details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (paymentId) {
      fetchOrderDetails();
    }
  }, [location.search]);
  return (
    <section className='sec'>
       <div className="container_s p-2">
  <div className="printer-top" />
  <div className="paper-container">
    <div className="printer-bottom" />
    <div className="paper">
    {orderDetails ? (
      <div className="main-contents">
        <div className="success-icon">✔</div>
        <div className="success-title">Payment Complete</div>
        <div className="success-description m-0">
          UNIT AMOUNT
        </div>
        <div className="success-description ">
        ₹ {orderDetails.lineItems[0].price_data.unit_amount} /-
        </div>
        <div className="order-details">
          <div className="order-number-label">Order ID:</div>
          <div className="order-number"style={{fontSize:"12px"}}>{orderDetails.paymentId}</div>
        </div>
        <div className="order-footer"><Link to={'/'}>GO TO HOME PAGE !</Link></div>
      </div>
        ) : (
          <p>Loading order details...</p>
        )}
      <div className="jagged-edge" />
      
    </div>
    
  </div>
</div>
    </section>
   

  )
}
