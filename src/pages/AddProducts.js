import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { API_BASE_URL } from '../config';

export default function AddProducts() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [picture, setPicture] = useState(null);

  const AddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('price', price);
      formData.append('mrp', mrp);
      formData.append('description', description);
      formData.append('quantity', quantity);
      formData.append('picture', picture);
console.log('formData:', formData);
      const response = await axios.post(
        `${API_BASE_URL}/api/products`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        toast.success('Product added successfully', { autoClose: 1000 });
        setDescription('')
        setMrp('')
        setPicture('')
        setProductName('')
        setQuantity('')
        setPrice('')
      } else {
        toast.error('Error', { autoClose: 1000 });
      }
    } catch (error) {
      toast.error('Error:', error.message);
    }
  };
          
  return (
    <div>
      <div>
          <ToastContainer/>

      <div className="col-md-12 d-flex justify-content-center mt-5 mb-5">
        <div className="card m-3 shadow">
          <h2 className="p-2 m-1">Add Product</h2>
          <div className="card-body">
            <>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0"> Name</h6>
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
                  <h6 className="mb-0">Price</h6>
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
                  <h6 className="mb-0">MRP</h6>
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
                  <h6 className="mb-0">Decription</h6>
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
                  <h6 className="mb-0">Picture</h6>
                </div>
                <input
                  type="file"
                  className="col-sm-8 text-secondary"
                  onChange={(e) => setPicture(e.target.files[0])}
                />
              </div>
             
              
             
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Quantity</h6>
                </div>
                <input
                  type="text"
                  className="col-sm-8 text-secondary"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
             
              <div className="row mb-3">
                <div className="col-sm-12">
                  <button className="btn btn-info" onClick={AddProduct}>
                    Add Product
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
