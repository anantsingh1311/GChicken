import React, {Component} from "react";
import {Link} from 'react-router-dom';
import "../App.css"
import "@fontsource/great-vibes"; 
import "bootstrap/dist/css/bootstrap.min.css";
import brandLogo from "../brand-logo.JPG";

export default class Navbar extends Component{
    render(){
      const user = JSON.parse(localStorage.getItem("user"));
        return(
        <nav className="navbar royal-nav-bar navbar-expand-lg fs-4 fs-md-1">
        <Link to="/" className="navbar-brand royal-title">GChickenn<img
  src={brandLogo}
  alt="GChickenn logo"
  className="navbar-logo"
/></Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto royal-nav-bar2">
          <li className="navbar-item">
          <Link to="/" className="nav-link royal-nav-link"><b>Home</b></Link>
          </li>
           <li className="navbar-item">
          <Link to="/Login" className="nav-link royal-nav-link"><b>Log-in</b></Link>
          </li>
           <li className="navbar-item">
          <Link to="/Signup" className="nav-link royal-nav-link"><b>Sign-Up</b></Link>
          </li>
           <li className="navbar-item">
          <Link to="/Products" className="nav-link royal-nav-link"><b>Products</b></Link>
          </li>
           <li className="navbar-item">
          <Link to="/Order" className="nav-link royal-nav-link"><b>Order Now</b></Link>
          </li>
            {user && user.role === "admin" && (
         <li className="navbar-item">
          <Link to="/Admin" className="nav-link royal-nav-link"><b>Admin</b></Link>
            </li>
         )}
        </ul>
        </div>
      </nav>)
    ;
    }
}

