import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js'
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js'
import LoginSignUp from './components/User/LoginSignUp.js';
import Profile from './components/User/Profile.js';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js';
import ResetPassword from './components/User/ResetPassword.js';
import Cart from './components/Cart/Cart.js'
import Shipping from './components/Cart/Shipping.js'
import ConfirmOrder from './components/Cart/ConfirmOrder.js'
import Payment from './components/Cart/Payment.js'
import OrderSuccess from './components/Cart/orderSuccess.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import webFont from 'webfontloader';
import store from './store.js';
import { clearErrors, loadUser } from './actions/userAction.js';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';

function App() {

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {

    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/v1/stripeapikey");
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.error("Error fetching Stripe API key:", error);
      }
    };
    
    webFont.load({
      google: {
        families : ['Roboto', 'Droid Sana', 'Chilanka']
      }
    });

    store.dispatch(loadUser());
    setTimeout(() => {
      store.dispatch(clearErrors());
    },100);

    fetchData();

  },[stripeApiKey]);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} user={user}/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product/:id" element={<ProductDetails/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route path="/products/:keyword" element={<Products/>}/>
        <Route exact path="/search" element={<Search />}/>
        <Route exact path="/login" element={<LoginSignUp />}/>
        {isAuthenticated && <Route exact path="/account" element={<Profile />}/>}
        {isAuthenticated && <Route exact path="/me/update" element={<UpdateProfile/>}/>}
        {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword/>}/>}
        <Route exact path="/password/forgot" element={<ForgotPassword/>}/>
        <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
        {isAuthenticated && <Route exact path="/cart" element={<Cart/>}/>}
        {isAuthenticated && <Route exact path="/shipping" element={<Shipping/>}/>}
        {isAuthenticated && <Route exact path="/order/confirm" element={<ConfirmOrder/>}/>}
        {isAuthenticated && stripeApiKey && <Route exact path="/process/payment" element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment/>
            </Elements>
          }/>}
        {isAuthenticated && <Route exact path="/success" element={<OrderSuccess/>}/>}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
