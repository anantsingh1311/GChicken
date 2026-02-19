import React, {Component} from "react";
import {Link} from 'react-router-dom';
import "../App.css"
import "@fontsource/great-vibes"; 
import "bootstrap/dist/css/bootstrap.min.css";

export default class Navbar extends Component{

    render(){
        return(
  <header className="royal-header text-center">
  <Link to="/" className="navbar-brand d-block mb-2">
    <h1 className="royal-title mb-0">GChickenn</h1>
  </Link>

  <nav className="navbar navbar-expand-md justify-content-center royal-navbar">
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
</header>



    );
    }
}