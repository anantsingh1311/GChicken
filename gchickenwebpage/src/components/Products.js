import React, { Component } from "react";
import "../App.css";
import "../Products.css";
import "@fontsource/great-vibes"; 
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/items")
      .then(response => {
        this.setState({ products: response.data });
        console.log("Products from API:", response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }

  render() {
    const { products } = this.state;

    return (
      <div className="app-root">
        <h1 className="textTypeCursive" id="titleProducts"><b>Products</b></h1>
  <div className="tables-container">
    <div className="textTypeCursive">
      
      <h2 id="titleProducts"><b>Wholesale Price sheet</b></h2>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <table className="tablecontent">
          <thead>
            <tr>
              <th>Product</th>
              <th>Image</th>
              <th>Type</th>
              <th>Price</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.itemName}</td>
                <td>img</td>
                <td>{product.description}</td>
                <td>{product.price || product.Price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

    <div className="textTypeCursive">
        <h2 id="titleProducts"><b>Retail Price sheet</b></h2>
      <table className="tablecontent">
        <thead>
          <tr>
            <th>Product</th>
            <th>Image</th>
            <th>Type</th>
            <th>Price</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.itemName}</td>
              <td>Image</td>
              <td>{product.description}</td>
              <td>{product.price || product.Price }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
    );
  }
}