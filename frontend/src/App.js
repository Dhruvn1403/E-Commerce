import './App.css';
import React from 'react';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js'
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import webFont from 'webfontloader';

function App() {

  React.useEffect(() => {
    
    webFont.load({
      google: {
        families : ['Roboto', 'Droid Sana', 'Chilanka']
      }
    });
  },[]);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product/:id" element={<ProductDetails/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route path="/products/:keyword" element={<Products/>}/>
        <Route exact path="/search" element={<Search />}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
