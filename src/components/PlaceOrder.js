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
        // Sending a GET request to the server to fetch shipping addresses
        const response = await fetch(`${API_BASE_URL}/getShipping-Addresses`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`, // Including authorization token in the headers
                'Content-Type': 'application/json', // Specifying content type as JSON
            },
        });

        // Checking if the response is successful (status code 2xx)
        if (response.ok) {
            // Parsing the response data as JSON
            const data = await response.json();
            // Setting the shipping addresses in your application state or performing further actions
            setShippingAddresses(data.shippingAddresses);
            // Logging the shipping addresses to the console
            console.log(data.shippingAddresses);
        } else {
            // Logging an error message if the response status is not ok
            console.error('Error fetching shipping addresses:', response.statusText);
        }
    } catch (error) {
        // Catching and logging any errors that occur during the fetch operation
        console.error('Error fetching shipping addresses:', error);
    }
};

        
        //...................................................................
        
     // Function to calculate the subtotal of items in the cart
const calculateSubTotal = () => {
  // Using reduce to sum up the total price of all items in the cart
  return cartItems.reduce((total, item) => {
      return total + item.price * item.counter;
  }, 0);
};

// Getting the length of the cartItems array
let cartLength = cartItems.length;

// Retrieving the postal code from local storage
const postal = localStorage.getItem("postalcode");
console.log(postal);

// Filtering shipping addresses based on the postal code
const filteredAddresses = shippingAddresses.filter(address => Number(address.postalcode) === Number(postal));
console.log(filteredAddresses);

     
//...............................................
const makePayment = async () => {
  // Load Stripe library
  const stripe = await loadStripe('pk_test_51N7vdjSD3r9BRhLaSVaV19xTJxXaSlfRddM2MRq2GcofsJc8ykfwDPpHXcRP1drgPl6TD30WhvGjnRUiGWBfGdZX00n7z4fp63');

  // Prepare the request body with necessary payment details
  const body = {
      products: cartItems, // List of products in the cart
      subtotal: calculateSubTotal(), // Subtotal of the cart
      user: user, // Information about the user
  };

  // Define headers for the request
  const headers = {
      "Content-Type": "application/json"
  };

  // Send a request to your server to create a checkout session
  const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
  });

  // Parse the response to get the session data
  const session = await response.json();

  // Redirect the user to the Stripe checkout page using the obtained session ID
  const result = stripe.redirectToCheckout({
      sessionId: session.id
  });

  // Log the result of redirectToCheckout for debugging purposes
  console.log(result);

  // Log any errors if occurred during redirection
  if (result.error) {
      console.log(result.error);
  }
};

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
                        {item.size ? <span>Size: {item.size}</span> : null}  <h5>Quantity: {item.counter}</h5>
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
