import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const authToken = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userFirstName = user && user.firstname;
  const userLastName = user && user.lastname;
  const isAdmin = user && user.isAdmin;

  return (
    <div style={{ position: 'sticky', top: '63px', zIndex: '1000' }}>
         
      <ul className="nav justify-content-center align-items-center subnav">
  {/* <!-- Home link --> */}
  <li className="nav-item">
      <Link className="nav-link" to="/">Home</Link>
  </li>
  
  {/* <!-- All Products link --> */}
  <li className="nav-item">
      <Link className="nav-link" to="/allProducts">All Products</Link>
  </li>
  {isAdmin ? (
  <li className="nav-item">
      <Link className="nav-link" to="/addProducts">Add Products</Link>
  </li>
     ): ""}
 
  
  
  {/* <!-- Contact link --> */}
  <li className="nav-item">
      <Link className="nav-link" href="/contact.html">Contact</Link>
  </li>
</ul>

    </div>
  )
}
