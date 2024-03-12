import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../config';
import { ToastContainer, toast } from 'react-toastify';

export default function Order_table() {
const [orders , setOrders]=useState([]);
const [loading , setLoading] = useState(true);
          
  useEffect(() => {
          const apiUrl = `${API_BASE_URL}/api/orders/get-all-orders`;
      
          const fetchOrders = async () => {
            try {
              const response = await fetch(apiUrl);
              const data = await response.json();
              setOrders(data);
              setLoading(false);
              console.log(data);
            } catch (error) {
              setLoading(false);
              toast.error('Error fetching products:', error);
            }
          };
      
          fetchOrders();
        }, []);

        
      
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
                  <th scope="col">NAME</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">NAME</th>
                  <th scope="col">PAYMENTID</th>
                  <th scope="col">STATUS</th>
                
                 
                
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>   {order.lineItems.map((lineItem, i) => (
                      <p key={i}>{i + 1}. {lineItem.price_data.product_data.name}{i !== order.lineItems.length - 1 && ', '}</p>
                    ))}</td>
                    <td className="text-nowrap"> ₹{order.lineItems.reduce((total, item) => total + item.price_data.unit_amount, 0) / 100}</td>
                    <td className="text-nowrap">{order.user.firstname} {order.user.lastname}</td>
                    <td >{order.paymentId}</td>
                    <td style={{color:"green" , fontWeight:"500"}}>PAID</td>
                    
                  
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
  )
}
