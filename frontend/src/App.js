import './App.css';
import React from 'react';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js'
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js'
import LoginSignUp from './components/User/LoginSignUp.js';
import Profile from './components/User/Profile.js';
import UpdateProfile from './components/User/UpdateProfile.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import webFont from 'webfontloader';
import store from './store.js';
import { loadUser } from './actions/userAction.js';
import { useSelector } from 'react-redux';

function App() {

  const { user, isAuthenticated } = useSelector((state) => state.user);

  React.useEffect(() => {
    
    webFont.load({
      google: {
        families : ['Roboto', 'Droid Sana', 'Chilanka']
      }
    });

    store.dispatch(loadUser());

  },[]);

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
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
