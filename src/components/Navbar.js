import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const authToken = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userFirstName = user && user.firstname;
  const userLastName = user && user.lastname;
  const isAdmin = user && user.isAdmin;
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div style={{ position: 'sticky', top: '60px', zIndex: '1000' }}>
       

        <ul className="nav justify-content-center align-items-center subnav">
          {/* Home link */}
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          {/* All Products link */}
          <li className="nav-item">
            <Link className="nav-link" to="/allProducts">
              All Products
            </Link>
          </li>

          {isAdmin ? (
            <li className="nav-item">
              <Link className="nav-link" to="/addProducts">
                Add Products
              </Link>
            </li>
          ) : ''}

          {/* Contact link */}
          <li className="nav-item">
            <Link className="nav-link" href="/contact.html">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div
        className={`offcanvas offcanvas-start${isMenuOpen ? ' show' : ''}`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleMenuToggle}
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allProducts">
                All Products
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/addProducts">
                  Add Products
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/contact.html">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
