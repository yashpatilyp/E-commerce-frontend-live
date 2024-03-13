import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import axios from 'axios';

export default function User_order_table() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user && user.email;

  useEffect(() => {
    async function fetchOrdersByEmail(email) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/orders/get-orders-by-user-email/${email}`);
        setOrders(response.data.reverse());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Error fetching orders. Please try again later.');
        setLoading(false);
      }
    }

    if (email) {
      fetchOrdersByEmail(email);
    }
  }, [email]);

  const fetchOrderByPaymentId = async (paymentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/orders/get-order-by-payment-id/${paymentId}`);
      setOrderDetails(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Error fetching order details. Please try again later.');
    }
  };

  const handleDetailsClick = (paymentId) => {
    setSelectedPaymentId(paymentId);
    fetchOrderByPaymentId(paymentId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='container summary'>
      <ToastContainer />
      <h1 className=''>ORDER HISTORY</h1>
      {loading ? (
        <div className="text-center d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
          <i className="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
        </div>
      ) : (
        <div className="table-responsive container">
          <table className="table table-striped">
            <thead style={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "#f5f5f5" }}>
              <tr>
                <th scope="col">SR</th>
                <th scope="col">ORDER ID</th>
                <th scope="col">PRICE</th>
           
                <th scope="col">PAYMENT ID</th>
                <th scope="col">STATUS</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{order._id}</td>
                  <td className="text-nowrap">₹{order.lineItems.reduce((total, item) => total + (item.price_data.unit_amount * item.quantity), 0) / 100}</td>
                 
                  <td>{order.paymentId}</td>
                  <td style={{ color: "green", fontWeight: "500" }}>PAID</td>
                  <td style={{ color: "red", fontWeight: "500", cursor: "pointer" }} onClick={() => handleDetailsClick(order.paymentId)}>
                  <button type="button" class="btn btn-primary btn-sm">Details</button>
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
            zIndex: 1007,
          },
          content: {
            zIndex: 1008,
          },
        }}>
          <div className="p-1 modalcontainer">
            <h2>Order Details</h2>
            <h6>Name: {orderDetails.user && `${orderDetails.user.firstname} ${orderDetails.user.lastname}`}</h6>
            <h6>Email: {orderDetails.user && orderDetails.user.email}</h6>
            <h6>Payment ID: {selectedPaymentId}</h6>
            <h2>Products:</h2>
            <div className="card mt-3 shadow">
              <div className="card-body">
                <h5 className="card-title"> Items</h5>
                <div className="row">
                  {orderDetails.productinfo && orderDetails.productinfo.map((item, index) => (
                    <div key={index} className="col-sm-6">
                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className='p-1'>
                              <img src={item.picture} alt="" style={{ height: "80px" }} className='p-1' />
                              <p className="mb-0">Product Name: {item.name}</p>
                              <p className="mb-0">Quantity: {item.quantity}</p>
                              <p className="mb-0">Size: {item.size}</p>
                              <p className="mb-0 p-1">Price: ₹{item.price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-footer text-right">
                <button onClick={closeModal} className='btn btn-danger'>Close Modal</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
