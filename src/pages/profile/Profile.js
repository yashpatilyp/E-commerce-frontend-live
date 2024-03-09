import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "../../config";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      try {
        const response = await axios.get(`${API_BASE_URL}/userinfo`, {
          headers,
        });

        if (response.status === 200) {
          console.log(response.data);
          setUserData(response.data);
          setLoading(false);
        } else {
          console.error("Failed ");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error :", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

//........................................................................
const [shippingAddresses, setShippingAddresses] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const authToken = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    try {
      // Fetch user information
      const userInfoResponse = await axios.get(`${API_BASE_URL}/userinfo`, {
        headers,
      });

      if (userInfoResponse.status === 200) {
        console.log(userInfoResponse.data);
        setUserData(userInfoResponse.data);
      } else {
        console.error("Failed to fetch user information");
      }

      // Fetch shipping addresses
      const shippingAddressesResponse = await axios.get(`${API_BASE_URL}/getShipping-Addresses`, {
        headers,
      });

      if (shippingAddressesResponse.status === 200) {
        console.log(shippingAddressesResponse.data);
        setShippingAddresses(shippingAddressesResponse.data.shippingAddresses);
      } else {
        console.error("Failed to fetch shipping addresses");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchData();
}, []);

//.........................................................................
const handleDeleteAddress = async (addressId) => {
  const authToken = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  try {
    // Send a request to delete the address
    const deleteResponse = await axios.delete(`${API_BASE_URL}/deleteAddress/${addressId}`, {
      headers,
    });

    if (deleteResponse.status === 200) {
      // Update the local state to reflect the deletion
      setShippingAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== addressId)
      );
     toast.success("Address deleted successfully");
    } else {
      toast.error("Failed to delete address");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
  return (
    <>
      <div className="col-md-12 d-flex justify-content-center mt-5 mb-5" >
      <ToastContainer/>
      <div className="card m-3 shadow ">
        <h2 className="p-2 m-1">Profile Info</h2>
        {loading ? (
        // Render a loading icon or spinner while data is being fetched
        <div className="text-center d-flex justify-content-center align-items-center" style={{height:"400px", width:"100%"}}>
        <i className="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
        
      </div>
      ) : (
        <div className="card-body card-bodyy ">
          {userData && userData.user && (
            <>
              <div className="row">
                <div className="col-sm-3 ">
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {userData.user.firstname} {userData.user.lastname}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {userData.user.email}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Mobile</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {userData.user.mobilenumber}
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Address</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {userData.user.address}
                </div>
              </div>
              <hr />
              
              <div className="row ">
                <div className="col-sm-12 text-end">
                  <Link className="btn btn-info " to="/profile_edit">
                   
                    <FontAwesomeIcon icon={faEdit}  /> 
                    
                  </Link>
                </div>
              </div>
            </>
          )}
           {shippingAddresses.length > 0 && (
            <>
              <hr />
              <h4 className="p-2 m-1">Shipping Addresses</h4>
              {shippingAddresses.map((address, index) => (
                <div key={index} className="p-2">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address {index + 1}</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {/* Display address details */}
                      <p>{address.fullname},</p>
                     <p>{address.address},</p>
                     <p>{address.city},</p>
                     <p>{address.mobilenumber},</p>
                     <p>{address.postalcode}</p>  
                    </div>
                    <div className="col-sm-12 text-end">
                      {/* Delete icon using Font Awesome */}
                      <span
                        className="text-danger cursor-pointer"
                        onClick={() => handleDeleteAddress(address._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </>
          )}
        </div>
          )}
      </div>
    </div>
   
    </>
    
  );
}
