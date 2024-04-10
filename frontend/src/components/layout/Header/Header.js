import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'; 
import { FaSearch, FaUser } from 'react-icons/fa'; 
import logo from "../../../images/download.png";
import UserOptions from './UserOptions';
import './Header.css'

const Header = ({isAuthenticated, user}) => {

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
        {
          isAuthenticated ? (
            <div className="icon">
              <UserOptions className="icon" user={user} isAuthenticated={isAuthenticated} />
            </div>
          ) : (
            <Fragment>
              <Link to="/search">
              <div className="icon"><FaSearch /></div>
            </Link>
              <Link to="/login">
            <div className="icon"><FaUser /></div>
          </Link>
            </Fragment>
          )
        }
      </div>
    </header>
  );
}

export default Header;
