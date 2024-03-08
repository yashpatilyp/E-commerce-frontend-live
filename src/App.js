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
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';

import ShippingAddress from './components/ShippingAddress';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Profile_Edit from './pages/Profile_Edit';
import AddProducts from './pages/AddProducts';
import All_Products from './pages/All_Products';
import 'react-toastify/dist/ReactToastify.css';
import Payment from './components/Payment';
import PlaceOrder from './components/PlaceOrder';
import Checkout from './pages/Checkout';
import Product_Table from './pages/Product_Table';


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
          <Route path="/singleProduct/:_id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />

        
          <Route path="/shipping" element={<ShippingAddress />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />

          <Route path="/addProducts" element={<AddProducts />} />
          <Route path="/allProducts" element={<All_Products />} />
          <Route path="/showproducts" element={<Product_Table />} />

          <Route path="/checkout" element={<Checkout />} />
          
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
