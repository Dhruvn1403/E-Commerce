import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'; 
import logo from "../../../images/download.png";
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt='logo'/>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="icons">
        <Link to="/search">
          <div className="icon"><FaSearch /></div>
        </Link>
        <Link to="/login">
          <div className="icon"><FaShoppingCart /></div>
        </Link>
        <Link to="/login">
          <div className="icon"><FaUser /></div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
