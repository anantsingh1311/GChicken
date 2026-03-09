import React, {Component} from "react";
import {Link} from 'react-router-dom';
import "../App.css"
import "@fontsource/great-vibes"; 
import "bootstrap/dist/css/bootstrap.min.css";
import brandLogo from "../brand-logo.JPG";

export default class Navbar extends Component{

    render(){
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
           <li className="navbar-item">
          <Link to="/Admin" className="nav-link royal-nav-link"><b>Admin-Page</b></Link>
          </li>
        </ul>
        </div>
      </nav>)
    ;
    }
}


  {/* <nav className="navbar navbar-expand-lg royal-navbar">
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#royalNav"
      aria-controls="royalNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse justify-content-center" id="royalNav">
      <ul className="navbar-nav flex-column flex-md-row">
        <li className="nav-item">
          <Link to="/" className="nav-link royal-nav-link">
            Home
          </Link>
        </li>
      </ul>
    </div>
  </nav>
</header> */}

  // <header className="royal-header text-center">
  // <Link to="/" className="navbar-brand d-block mb-2">
  //   <h1 className="royal-title mb-0">GChickenn</h1>
  // </Link>