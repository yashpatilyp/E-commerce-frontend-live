import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './Css/cart.css'
import './Css/profile.css'
import './Css/allProducts.css'
import './Css/Order.css'
import './Css/payment.css'
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
// index.js or App.js
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SingleProduct from './pages/products/SingleProduct';
import Cart from './pages/Cart';

import ShippingAddress from './components/ShippingAddress';
import Navbar from './components/Navbar';
import Profile from './pages/profile/Profile';
import Profile_Edit from './pages/profile/Profile_Edit';

import 'react-toastify/dist/ReactToastify.css';
import Payment from './components/Payment';
import PlaceOrder from './components/PlaceOrder';
import Checkout from './pages/Checkout';
import AddProducts from './pages/products/AddProducts';
import Product_Table from './pages/products/Product_Table';
import AllProducts from './pages/products/All_Products';
import Product_Edit from './pages/products/Product_Edit';
import User_Profile from './pages/profile/User_Profile';



function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile_edit" element={<Profile_Edit />} />
          <Route path="/user_profile" element={<User_Profile />} />


          <Route path="/singleProduct/:_id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />

        
          <Route path="/shipping" element={<ShippingAddress />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />

          <Route path="/addProducts" element={<AddProducts />} />
          <Route path="/allProducts" element={<AllProducts/>} />
          <Route path="/showproducts" element={<Product_Table />} />
          <Route path="/edit_product/:_id" element={<Product_Edit />} />

          <Route path="/checkout" element={<Checkout />} />
          
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
