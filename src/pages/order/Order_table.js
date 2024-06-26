import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal'; // Import the modal library you are using

export default function Order_table() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    // Define the API endpoint URL for fetching orders
    const apiUrl = `${API_BASE_URL}/api/orders/get-all-orders`;

    // Function to fetch orders from the server
    const fetchOrders = async () => {
        try {
            // Send a GET request to fetch orders
            const response = await fetch(apiUrl);
            // Parse the response data as JSON
            const data = await response.json();
            // Set the fetched orders in the state and reverse the order to show the latest orders first
            setOrders(data.reverse());
            // Set loading state to false
            setLoading(false);
            console.log(data);
        } catch (error) {
            // Set loading state to false in case of error
            setLoading(false);
            // Display an error message if fetching orders fails
            toast.error('Error fetching products:', error);
        }
    };

    // Call fetchOrders function when the component mounts (empty dependency array ensures it only runs once)
    fetchOrders();
}, []);

// Function to fetch order details by payment ID
const fetchOrderByPaymentId = async (paymentId) => {
    console.log(paymentId);
    try {
        // Send a GET request to fetch order details for the specified payment ID
        const response = await fetch(`${API_BASE_URL}/api/orders/get-order-by-payment-id/${paymentId}`);
        // Parse the response data as JSON
        const data = await response.json();
        // Set the fetched order details in the state
        setOrderDetails(data);
        console.log(data);
        // Open the modal to display order details
        setIsModalOpen(true);
    } catch (error) {
        // Display an error message if fetching order details fails
        toast.error('Error fetching order details:', error);
    }
};

// Function to handle click event when user wants to view order details
const handleDetailsClick = (paymentId) => {
    console.log(paymentId);
    // Set the selected payment ID
    setSelectedPaymentId(paymentId);
    // Fetch and display order details for the selected payment ID
    fetchOrderByPaymentId(paymentId);
};

// Function to close the modal
const closeModal = () => {
    setIsModalOpen(false);
};
  
      
  return (
          <div className='container summary'>
          <ToastContainer/>
          <h1 className=''>ORDER HISTORY</h1>
          {loading ? (
           <div className="text-center d-flex justify-content-center align-items-center" style={{height:"400px"}}>
           <i className="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
           
         </div>
          ) : (
          <div className="table-responsive container">
            <table className="table table-striped">
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "#f5f5f5",
                }}>
                <tr>
                  <th scope="col">SR</th>
                  <th scope="col">ORDER ID</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">NAME</th>
                  <th scope="col">PAYMENTID</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">Details</th>
                
                 
                
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td scope="row">{order._id}</td>
                    {/* <td>   {order.lineItems.map((lineItem, i) => (
                      <p key={i}>{i + 1}. {lineItem.price_data.product_data.name}{i !== order.lineItems.length - 1 && ', '}</p>
                    ))}</td> */}
                    <td className="text-nowrap"> ₹{order.lineItems.reduce((total, item) => total + (item.price_data.unit_amount*item.quantity), 0) / 100}</td>
                    <td className="text-nowrap">{order.user.firstname} {order.user.lastname}</td>
                    <td >{order.paymentId}</td>
                    <td style={{color:"green" , fontWeight:"500"}}>PAID</td>
                    <td style={{ color: "red", fontWeight: "500" , cursor:"pointer"}}>
                    <p onClick={() => handleDetailsClick(order.paymentId)}>
                    <button type="button" class="btn btn-primary btn-sm">Details</button>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

{isModalOpen && (
  <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Order Details" style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1007, // Adjust the value as needed
    },
    content: {
      zIndex: 1008, // Make it higher than the overlay zIndex
    },
  }} >
    <div className=" p-1 modalcontainer">
    <h2>Order Details</h2>
    <h6>Name: {orderDetails.user.firstname} {orderDetails.user.lastname}</h6>
    <h6>Email: {orderDetails.user.email}</h6>
    <h6>Payment ID: {selectedPaymentId}</h6>
   
    
    <h2>Products:</h2>
    <div className="card mt-3 shadow ">
          <div className="card-body">
            <h5 className="card-title"> Items</h5>
            <div className="row">
              {orderDetails.productinfo.map((item, index) => (
                <div key={index} className="col-sm-6">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                 
                        <div className='p-1'>
                        <img src={item.picture} alt="" style={{ height: "80px" }} className='p-1'/>
                          <p className="mb-0">Product Name: {item.name}</p>
                          <p className="mb-0">Quantity: {item.counter}</p>
                          {item.size ? <p className="mb-0">Size: {item.size}</p> : null}
                          <p className="mb-0 p-1">Price: ₹{item.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
   
        <div className="card-footer text-right">
            <button onClick={closeModal} className='btn btn-danger btn-sm'>Close Modal</button>
          </div>
    </div>
  </Modal>
)}
    </div>
  )
}
