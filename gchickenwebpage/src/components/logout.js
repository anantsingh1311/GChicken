// src/components/LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout"); // backend clears the cookie
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
}