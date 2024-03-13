import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Signup() {
 // State variables for form inputs and loading state
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [mobileNumber,setMobileNumber] = useState('');
 const [address, setAddress] = useState('');
 const [loading, setLoading] = useState(false);

 // Function to handle user registration
 const register = (event) => {
   event.preventDefault();
  setLoading(true);

  if (!firstName || !lastName || !email || !mobileNumber || !address || !password) {
    setLoading(false);
    return Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'All fields are required',
    });
  }

  // Mobile number validation (for example, requiring 10 digits)
  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobileNumber)) {
    setLoading(false);
    return Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'Invalid mobile number. Please enter a 10-digit number.',
    });
  }

   // Prepare data for the registration request
   const requestData = {
     firstname: firstName,
     lastname: lastName,
     email: email,
     password: password,
     mobilenumber:mobileNumber,
     address: address,
    isAdmin: false
   };
   if (password.length < 6) {
    setLoading(false);
    return Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'Password must be at least 6 characters long.',
    });
  }
   // Send a POST request to the server for user registration
   axios.post(`${API_BASE_URL}/signup`, requestData)
     .then((result) => {
       if (result.status === 200) {
         console.log("Success");

         // Display success message, clear input fields, and set loading to false
         setLoading(false);
         Swal.fire({
           icon: 'success',
           title: 'User registration successful',
         });
       
         setEmail('');
         setFirstName('');
         setLastName('');
         setPassword('');
     setMobileNumber('')
     setAddress('');
       }
     })
     .catch((error) => {
      setLoading(false);
      console.error(error);

      // Handle registration failure and display appropriate error messages
      if (error.response.data.error) {
        const errorMessage = error.response.data.error;
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Some error occurred',
        });
      }
    });
};
  return (
    <div>
       <div class="card shadow-lg mx-auto mt-3 mb-4 container" style={{maxWidth: '600px'}}>
  
       <div className="container mt-0 mb-0">
  {/* Login form title */}
  <h1 class="card-title text-center">SIGN UP</h1>
  {/* Login form */}
  <form className="login-container" onSubmit={(e) => register(e)}>
    {/* Email input field */}
    <div className="form-group">
      <label htmlFor="exampleFormControlInput2">First Name :</label>
      <input
        type="text"
        className="form-control mt-2"
       
        placeholder="Enter First Name"
        value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="exampleFormControlInput2">Last Name :</label>
      <input
        type="text"
        className="form-control mt-2"
       
        placeholder="Enter Last Name"
        value={lastName} onChange={(e) => setLastName(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="exampleFormControlInput2">Email address :</label>
      <input
        type="email"
        className="form-control mt-2"
     
        placeholder="name@example.com"
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="exampleFormControlInput2">Mobile Number :</label>
      <input
        type="number"
        className="form-control mt-2"
       
        placeholder="Enter Mobile Number"
        value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="exampleFormControlInput2">Address :</label>
      <input
        type="text"
        className="form-control mt-2"
       
        placeholder="Enter Address"
        value={address} onChange={(e) => setAddress(e.target.value)}
      />
    </div>
    {/* Password input field */}
    <div className="form-group">
      <label htmlFor="exampleFormControlInput1">Password :</label>
      <input
        type="password"
        className="form-control mt-2"
       
        placeholder="Enter Password"
        value={password} onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    {/* Signup button */}
    <button type="submit" className="contact-btn w-100 mb-2 mt-3">
      SIGN UP
    </button>
    <div className='customer text-center '>
          <p className='mb-0'>Already Have An Account...?</p><Link to='/Login' className=' mb-4'>LOGIN</Link>
    </div>
  </form>
</div>
    </div></div>
   
  )
}
