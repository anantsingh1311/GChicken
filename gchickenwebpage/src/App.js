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
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Check user exists and has correct role
  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  if (user.role?.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}


function App() {
  return (
    <div className="app-root">
    
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Products" element={<Products/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/Order" element={<Order/>} />
            <Route path="/Admin" element={
              <AdminRoute>
                <Admin/>
              </AdminRoute>
          }/>
          </Routes>

        </Router>
    </div>
  );
}

export default App;
