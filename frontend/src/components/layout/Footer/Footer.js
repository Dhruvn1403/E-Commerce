import React from 'react'
// import { Link } from 'react-router-dom'
import playstore from '../../../images/playstore.png'
import appstore from '../../../images/appstore.png'
import logo from '../../../images/download.png'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">

        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Now on Android and IOS</p>
            <img src={playstore} alt="playstore"/>
            <img src={appstore} alt="appstore"/>
        </div>

        <div className="midFooter">
            {/* <Link to='/'> */}
            <img src={logo} alt='logo'></img>
            {/* </Link> */}
            <h1>ECommerce</h1>
            <p>High Quality is our first priority</p>

            <p>All rights reserved 2024 &copy; Dhruv</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us on</h4>
            <a href="https://www.instagram.com/dhruv_n_1403/">Instagram</a>
            <a href="https://www.instagram.com/dhruv_n_1403/">Twitter</a>
            <a href="https://www.instagram.com/dhruv_n_1403/">Youtube</a>
        </div>
      
    </footer>
  )
}

export default Footer
