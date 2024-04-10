  import axios from 'axios';
  import React, { useState } from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { API_BASE_URL } from '../config';
  import { useNavigate } from 'react-router-dom';

  export default function ShippingAddress({nextStep}) {
    const [fullname, setFullname] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [postalcode, setPostalCode] = useState('');
    const [city, setCity] = useState('');

    const navigate = useNavigate();

const AddShippingAddress = async (event) => {
    event.preventDefault();

    // Retrieve the authentication token from local storage
    const authToken = localStorage.getItem("token");

    // Define headers for the request
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
    };

    // Prepare data for the request
    const requestData = {
        fullname: fullname,
        mobilenumber: mobile,
        address: address,
        postalcode: postalcode,
        city: city
    };

    try {
        // Send a POST request to the server to add the shipping address
        const result = await axios.post(`${API_BASE_URL}/addShipping-Address`, requestData, { headers: headers });

        // If the request is successful (status code 200), handle accordingly
        if (result.status === 200) {
            console.log(result);
            // Display success message
            toast.success("Shipping Address added successfully", { autoClose: 1000 });
            // Store postal code in local storage
            localStorage.setItem('postalcode', postalcode);
            // Reset form fields
            setFullname('');
            setMobile('');
            setAddress('');
            setPostalCode('');
            setCity('');
            // Navigate to the next step in the process
            nextStep();
        }
    } catch (error) {
        console.error(error);
        
        // Handle errors from the server response
        if (error.response && error.response.data.error) {
            const errorMessage = error.response.data.error;

            // Display appropriate error messages based on the error received
            if (errorMessage === 'Shipping address already exists for this user') {
                toast.warning(errorMessage);
                // Store postal code in local storage
                localStorage.setItem('postalcode', postalcode);
                // Navigate to the next step in the process
                nextStep();
            } else {
                toast.error(errorMessage);
            }
        } else {
            // Display a generic error message if no specific error is received
            toast.error("Some error occurred");
        }
    }
};


    return (
      <div>
        <ToastContainer />
        <div className="col-md-12 d-flex justify-content-center">
    <div className="card m-3 shadow">
      <h2 className="p-2 m-1">Shipping Address</h2>
      <div className="card-body card-bodyyy ">
        <>
          <div className="row mb-3">
            <label htmlFor="fullname" className="col-sm-3 col-form-label">
              Full Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="fullname"
                placeholder="Enter Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="address" className="col-sm-3 col-form-label">
              Address
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="city" className="col-sm-3 col-form-label">
              City
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter City Name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="postalcode" className="col-sm-3 col-form-label">
              Postal Code
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="postalcode"
                placeholder="Enter Postal Code"
                value={postalcode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="mobile" className="col-sm-3 col-form-label">
              Mobile Number
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="mobile"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-12">
              <button className="btn btn-info" onClick={AddShippingAddress}>
                Continue
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  </div>

      </div>
    );
  }
