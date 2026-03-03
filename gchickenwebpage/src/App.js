import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Order from "./components/Order";
import Admin from "./components/Admin";

function App() {
  return (
    <div>
    
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Products" element={<Products/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/Order" element={<Order/>} />
            <Route path="/Admin" element={<Admin/>}/>
          </Routes>

        </Router>
    </div>
  );
}

export default App;
