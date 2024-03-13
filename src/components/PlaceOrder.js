import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js'

export default function PlaceOrder() {
  const { state: { cartItems }, dispatch } = useCart();
  console.log(cartItems);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const authToken = localStorage.getItem("token");
  const userDataString = localStorage.getItem("user");
  const user = JSON.parse(userDataString);
 
// Now 'user' is an object containing the parsed data
console.log(user);
  const navigate = useNavigate();

  // Fetch shipping addresses from the backend when the component mounts
  useEffect(() => {
    if (authToken) {
      fetchShippingAddresses();
    }
  }, [authToken]);

  const fetchShippingAddresses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getShipping-Addresses`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setShippingAddresses(data.shippingAddresses);
        console.log(data.shippingAddresses);
      } else {
        console.error('Error fetching shipping addresses:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching shipping addresses:', error);
    }
  };
        
        //...................................................................
        
        
        const calculateSubTotal = () => {
          return cartItems.reduce((total, item) => {
            return  total + item.price * item.counter;
          }, 0);
        };
        
        
       
        
          let cartLength = cartItems.length; 
         
          const postal = localStorage.getItem("postalcode");
          console.log(postal)
         
          const filteredAddresses = shippingAddresses.filter(address => Number(address.postalcode) === Number(postal));
          console.log(filteredAddresses)
     
//...............................................

const makePayment =async()=>{

  const stripe = await loadStripe('pk_test_51N7vdjSD3r9BRhLaSVaV19xTJxXaSlfRddM2MRq2GcofsJc8ykfwDPpHXcRP1drgPl6TD30WhvGjnRUiGWBfGdZX00n7z4fp63');


  const body ={
    products:cartItems,
    subtotal: calculateSubTotal(),
    user:user,
  }
  const headers ={
    "Content-Type": "application/json"
  }
const response = await fetch (`${API_BASE_URL}/api/create-checkout-session`,{
  method: 'POST',
  headers: headers,
  body:JSON.stringify(body)
})

const session = await response.json();

const result = stripe.redirectToCheckout({
  sessionId:session.id
 
})
console.log(result)

if (result.error){
  console.log(result.error)
}
}
  return (
          <div style={{minHeight:"500px"}} className='summary'>

      
          <div className="container mt-2 mb-4" >
          <h1 > Preview Order </h1>
            <div className="row">

              <div className="col-lg-8 cart">
              <div className='col-md-11 p-2 m-2 ' >
  <h4 className=''>Shipping <i class="fa-solid fa-truck-fast" style={{color:"black"}}></i> </h4>
  <hr />
  {filteredAddresses.length > 0 ? (
      <div className=''>
        <h6 className='mb-0'>Name: {filteredAddresses[0].fullname}</h6>
        <p>Address: {filteredAddresses[0].address}</p>
        <p>Postal Code: {filteredAddresses[0].postalcode}</p>
        <p>Phone no: {filteredAddresses[0].mobilenumber}</p>
      </div>
    ) : (
      <p>No matching shipping addresses available</p>
    )}
   
</div>

            <h4 className='p-2 m-2'>Items :</h4>
            
                 {cartItems.map((item) => (
                  <div key={item.id} className="row  p-2 m-2"style={{ backgroundColor:"whitesmoke",boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}>
                    {/* Product image */}
                    <div className="col-md-4 col-sm-12 ">
                      <img
                        src={item.picture}
                        className="img-fluid"
                        alt="Product Image"
                      />
                    </div>
                    {/* Product details */}
                    <div className="col-md-8 col-sm-12 mb-3">
                      <h2>{item.name}</h2>
                      <p>{item.description}</p>
                      <div className="price">
                        <h5>
                          ₹ {item.price} /- 
                        </h5>
                        <span>Size: {item.size}</span>  <h5>Quantity: {item.counter}</h5>
                      </div>
                      
                      
                    </div>
                    
                    {/* Quantity control */}
                    
                  </div>
                  ))}
              </div>
              {/* Right column for order summary */}
              <div className="col-lg-4 summary">
                <h4 className="mb-4 p-1">Order Summary</h4>
                {/* Order summary details */}
                <div className="row summary-content pt-2">
                  <div className="col">
                    <h5>Shipping</h5> 
                  </div>
                  <div className="col">
                    <h6>₹ 0 /-</h6>
                  </div>
                  <hr />
                  {/* Total cost details */}
                  <div className="row check">
                    <div className="col">
                    <h5>Total</h5> ( {cartLength } items )
                    </div>
                    <div className="col">
                      <p>
                        <b>₹ {calculateSubTotal()} /-</b>
                      </p>
                    </div>
                  </div>
                  {/* Checkout button */}
                  <div className="row check">
                    <button className="checkout-btn check" style={{width:"80%"}} onClick={makePayment}>
                      Place Order <i className="fa-sharp fa-solid fa-check" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
  )
}
