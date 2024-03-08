import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Product_Table() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const apiUrl = `${API_BASE_URL}/api/products`;

    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setAllProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  //......................................................................................
  const user = JSON.parse(localStorage.getItem("user"));


  const isAdmin = user && user.isAdmin;
console.log(isAdmin)
  const handleDeleteProduct = async (productId) => {
          try {
            // Check if isAdmin is true before making the delete request
            if (isAdmin===true) {
              const response = await axios.delete(`${API_BASE_URL}/api/products/${productId}`);
      
              if (response.status === 200) {
                // If deletion is successful, update the state to reflect the change
                setAllProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
                toast.success('Product deleted successfully');
              } else {
                toast.error('Failed to delete product');
              }
            } else {
              toast.error('Permission denied. Admin access required.');
            }
          } catch (error) {
            toast.error('Error:', error);
          }
        };

  return (
    <div className='container summary'>
      <h1>PRODUCTS</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">SR</th>
              <th scope="col">NAME</th>
              <th scope="col">PRICE</th>
              <th scope="col">MRP</th>
              <th scope="col">DESCRIPTION</th>
              <th scope="col">PICTURE</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td className="text-nowrap">₹{product.price}</td>
                <td className="text-nowrap">₹{product.mrp}</td>
                <td >{product.description}</td>
                <td>
                  <img src={product.picture} alt={product.name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                </td>
                <td>{product.quantity}</td>
                <td>
                  <FontAwesomeIcon icon={faEdit} style={{ color: "blue", cursor: "pointer" }} />{' '}
                  <FontAwesomeIcon icon={faTrash} style={{ color: "red", cursor: "pointer" }}  onClick={() => handleDeleteProduct(product._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
