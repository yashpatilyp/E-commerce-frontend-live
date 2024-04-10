import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
 
  
  const authToken = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userFirstName = user && user.firstname;
  const userLastName = user && user.lastname;
  const isAdmin = user && user.isAdmin;
 

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const {
    state: { cartItems },
    dispatch,
  } = useCart();

  let cartLength = cartItems.length;
  return (
    <div style={{ position: "sticky", top: "0", zIndex: "1001" }}>
      <>
      
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg p-2 ">
          
          
          {/* Container for the navigation bar content */}
          <div className="container-fluid">
            {/* Brand Logo */}
            <Link className="navbar-brand" to="/">
              <h3>E Commerce</h3>
            </Link>
            {/* Navbar Toggler for Mobile View */}
            
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* Navbar Items */}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* Search Form */}
              <form className="d-flex ms-auto" role="search">
                {/* <div className="input-box">
                
                  <i className="uil uil-search" />
                
                  <input type="text" placeholder="Search here..." />
                
                  <i className="fa-solid fa-magnifying-glass" />
                </div> */}
              </form>
              {/* Right-aligned Navbar Items */}
              <div className="ms-auto d-flex mt-1">
                {/* Login Button */}
                
                <div class="dropdown">
                  <button
                  
                    class="btn dropdown-toggle  "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{color:"black", fontWeight:"600" }}
                  >
                    {authToken ? (
                      <>
                        {isAdmin ? (
                          // Display admin-related content if isAdmin is true
                          <>
                            {userFirstName} {userLastName} (Admin)
                          </>
                        ) : (
                          // Display regular user content if isAdmin is false
                          <>
                            {userFirstName} {userLastName} <i class="fa-solid fa-user" style={{color:"red"}}></i>
                          </>
                        )}
                      </>
                    ) : (
                      // Display profile text if not authenticated
                      <span className="profile-text">Profile</span>
                    )}
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {!authToken ? (
                      <li>
                        <Link class="dropdown-item" to="/login">
                          Login
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                    {authToken ? (
                      <li>
                        <Link class="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                    {isAdmin===true ? (
                      <li>
                        <Link class="dropdown-item" to="/user_profile">
                         User Profiles
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                     {isAdmin===true ? (
                      <li>
                        <Link class="dropdown-item" to="/showproducts">
                          All Products
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                      {isAdmin===true ? (
                      <li>
                        <Link class="dropdown-item" to="/orders">
                        Order History
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                      
                    {authToken ? (
                      <li>
                        <a class="dropdown-item" href="/" onClick={logout}>
                          Log Out
                        </a>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>

                {/* Cart Icon */}

                <Link to="/cart" className="cart-link">
                  {cartLength > 0 && (
                    <span className="cart-length">{cartLength}</span>
                  )}
                  <FontAwesomeIcon
                    className="cart-icon"
                    icon={faCartShopping}
                  />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </>
    </div>
  );
}
