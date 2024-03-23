import './App.css';
import React from 'react';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import MyGallery from './components/Product/ProductDetails.js'
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
      {/* <Header/> */}
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/products/:id" element={<MyGallery/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
