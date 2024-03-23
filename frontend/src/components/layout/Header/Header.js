import React from 'react'
import 'react-icons'
import {ReactNavbar} from "overlay-navbar"
import logo from "../../../images/download.png"

const options={
      burgerColor:"white",
      burgerColorHover: "#eb4034", 
      logo, 
      logoWidth: "15vmax",
      navColor1: "black", 
      logoHoverSize: "10px", 
      logoHoverColor: "#eb4034", 
      link1Text: "Home",
      link2Text: "Products", 
      link3Text: "Contact",
      link4Text: "About",
      link1Url: "/",
      link2Url: "/products", 
      link3Url: "/contact", 
      link4Url: "/about", 
      link1Size: "1.5vmax", 
      link1Color: "white", 
      nav1justifyContent: "flex-end", 
      nav2justifyContent: "flex-end", 
      nav3justifyContent: "flex-start", 
      nav4justifyContent: "flex-start", 
      link1ColorHover: "#eb4034", 
      link1Margin: "2.5vmax",
      profileIconUrl: "/login", 
      searchIconColor:"white",
      cartIconColor:"white",
      profileIconColor:"white", 
      profileIconColorHover: "#eb4034", 
      searchIconColorHover: "#eb4034", 
      cartIconColorHover: "#eb4034", 
      cartIconMargin: "1vmax",
}

const Header = () => {
  return (
    <ReactNavbar
       {...options}
    />

  )
}

export default Header;
