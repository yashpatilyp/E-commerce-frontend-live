import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {

  // State variables for form inputs and loading state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State variable to track password visibility
  const [loading, setLoading] = useState(false);

  // Redux dispatch and React Router navigate hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle user login
  const login = (event) => {
    event.preventDefault();
    setLoading(true);

    // Prepare data for the login request
    const requestData = {
      email: email,
      password: password
    };

    // Send a POST request to the server for user login
    axios.post(`${API_BASE_URL}/login`, requestData)
      .then((result) => {
        if (result.status === 200) {
          console.log("token : ", result.data.result.token)
          console.log("Success");

          // Display success message, set user data in local storage, dispatch login success action, and navigate to the addSales page
          setLoading(false);
          Swal.fire({
            icon: 'success',
            title: 'User LoggedIn successful',
          });
          localStorage.setItem("token", result.data.result.token);
          localStorage.setItem("user", JSON.stringify(result.data.result.userInfo));
          dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.userInfo });
          setLoading(false);
          
          navigate('/');
        }
        window.location.reload();

      })
      .catch((error) => {
        setLoading(false);
        console.error(error);

        // Handle login failure and display appropriate error messages
        if (error.response.data.error) {
          const errorMessage = error.response.data.error;
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
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

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div style={{minHeight:"590px"}}>
      <div class="card shadow-lg mx-auto mt-5 mb-4 container" style={{maxWidth: '600px'}}>
        <div class="card-body"></div>
        <div className="container mt-2 mb-4">
          {/* Login form title */}
          <h1 class="card-title text-center">SIGN IN</h1>
          {/* Login form */}
          <form className="login-container" onSubmit={(e) => login(e)}>
            {/* Email input field */}
            <div className="form-group">
              <label for="exampleFormControlInput2">Email address :</label>
              <input
                type="email"
                className="form-control mt-2"
                id="exampleFormControlInput2"
                placeholder="name@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password input field */}
            <div className="form-group">
              <label for="exampleFormControlInput1">Password :</label>
              <div className="input-group">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control mt-2"
                  id="exampleFormControlInput1"
                  placeholder="Enter Password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append d-flex">
                  <span className="input-group-text p-1" onClick={togglePasswordVisibility} style={{marginTop:"8px"}}>
                    {passwordVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                  </span>
                </div>
              </div>
            </div>
            {/* Login button */}
            <button type="submit" className="contact-btn w-100 mb-2 mt-3">
              SIGN IN
            </button>
            <div className="customer text-center">
              <p className='mb-0'>New Customer...?</p>
              <Link to="/signup" className="">Create Your Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
