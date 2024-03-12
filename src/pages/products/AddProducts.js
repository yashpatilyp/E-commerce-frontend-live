import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { API_BASE_URL } from '../../config';



export default function AddProducts() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [picture, setPicture] = useState(null);
const [size, setSize] =useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
  };
  const addProduct = async (e) => {
    e.preventDefault();
  
    try {
      // Check if picture is selected
      if (!picture) {
        toast.error('Picture is required');
        return;
      }
  
      // Append all data to FormData for the backend API request
      const formDataForBackend = new FormData();
      formDataForBackend.append('name', productName);
      formDataForBackend.append('price', price);
      formDataForBackend.append('mrp', mrp);
      formDataForBackend.append('description', description);
      formDataForBackend.append('quantity', quantity);
      formDataForBackend.append('size', size);
      formDataForBackend.append('picture', picture);
  
      console.log('FormData for Backend:', formDataForBackend);
  
      // Send data to backend API
      const productResponse = await axios.post(
        `${API_BASE_URL}/api/products`,
        formDataForBackend
      );
  
      if (productResponse.status >= 200 && productResponse.status < 300) {
        console.log('Product added successfully:', productResponse.data);
        toast.success(productResponse.data)
        // Reset form fields
        setProductName('');
        setPrice('');
        setMrp('');
        setDescription('');
        setQuantity('');
        setSize('');
        setPicture(null);
      } else {
        console.error('Error response from server:', productResponse);
      }
      
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  




          
  return (
    <div>
      <div>
          <ToastContainer/>
          <form  onSubmit={(e) => addProduct(e)}>
      <div className="col-md-12 d-flex justify-content-center mt-5 mb-5">
        <div className="card m-3 shadow p-3 ">
          <h2 className="p-2 m-1">Add Product</h2>
          <div className="card-body">
            <>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-1"> Name</h6>
                </div>
                <input
                  type="text"
                  className="col-sm-8 text-secondary"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
             
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-1">Price</h6>
                </div>
                <input
                  type="number"
                  className="col-sm-8 text-secondary"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
             
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-1">MRP</h6>
                </div>
                <input
                  type="number"
                  className="col-sm-8 text-secondary"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                />
              </div>
              <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-1">Size</h6>
                    </div>
                    <select
                      className="col-sm-8 text-secondary"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="" disabled>Select Size</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>

                      {/* Add more size options as needed */}
                    </select>
                  </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-1">Decription</h6>
                </div>
                <input
                  type="text"
                  className="col-sm-8 text-secondary"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>  
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-1">Picture</h6>
                </div>
                <input
                  type="file"
                  className="col-sm-8 text-secondary"
                  accept="image/*" onChange={handleImageChange}
                />
              </div>
             
              
             
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-1">Quantity</h6>
                </div>
                <input
                  type="number"
                  className="col-sm-8 text-secondary"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
             
              <div className="row mb-3">
                <div className="col-sm-12">
                  <button className="btn btn-info"type="submit" >
                    Add Product
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </form>
    </div>
    </div>
  )
}
