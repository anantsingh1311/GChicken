import React, {Component} from "react";
import {Link} from 'react-router-dom';
import "../App.css"
import "@fontsource/great-vibes"; 
import "bootstrap/dist/css/bootstrap.min.css";
import brandLogo from "../brand-logo.JPG";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user"))
    };
  }

  componentDidMount() {
    window.addEventListener("storage", this.syncUser);
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.syncUser);
  }

  syncUser = () => {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) });
  };

  handleLogout = () => {
  // Remove user info from localStorage
  localStorage.removeItem("user");
  

  // Update state to trigger re-render
  this.setState({ user: null });

  localStorage.removeItem("token");
sessionStorage.clear(); // if you store anything there

  // Redirect to login page
  window.location.href = "/Login"; // industry-standard simple redirect
};

  render() {
  const { user } = this.state;

  return (
  <>
    {/* Top-right login/logout */}
    <div className="top-right-auth">
      {user ? (
        <>
          {user.role === "admin" && (
            <Link to="/Admin" className="nav-link royal-nav-link">
              <b>Admin</b>
            </Link>
          )}
          <span
            onClick={this.handleLogout}
            className="nav-link royal-nav-link"
            style={{ cursor: "pointer" }}
          >
            <b>Logout</b>
          </span>
        </>
      ) : (
        <>
          <Link to="/Login" className="nav-link royal-nav-link">
            <b>Log-in</b>
          </Link>
          <Link to="/Signup" className="nav-link royal-nav-link">
            <b>Sign-Up</b>
          </Link>
        </>
      )}
    </div>

    {/* Navbar */}
    <nav className="navbar royal-nav-bar navbar-expand-lg fs-4 fs-md-1">
      <Link to="/" className="navbar-brand royal-title">
        GChickenn
        <img src={brandLogo} alt="GChickenn logo" className="navbar-logo" />
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link royal-nav-link"><b>Home</b></Link>
          </li>
          <li className="navbar-item">
            <Link to="/Products" className="nav-link royal-nav-link"><b>Products</b></Link>
          </li>
          <li className="navbar-item">
            <Link to="/Order" className="nav-link royal-nav-link"><b>Order Now</b></Link>
          </li>
        </ul>
      </div>
    </nav>
  </>
);
}}