import React, { Component } from "react"; 
// Import React and Component class to create a class-based React component
import "../Products.css"; 
// Import CSS files for styling the app and products table

import "@fontsource/great-vibes"; 
// Import a custom Google font for styling text

import "bootstrap/dist/css/bootstrap.min.css"; 
// Import Bootstrap for prebuilt UI styling

import axios from "axios"; 
// Axios is used to make HTTP requests to the backend API


export default class Products extends Component {

  constructor(props) {
    super(props);

    // Component state stores dynamic data used in the UI
    this.state = {
      products: [],        // Array to store products fetched from the backend
      lightboxOpen: false, // Controls whether the image popup (lightbox) is visible
      lightboxImages: [],  // Stores all images for the selected product
      imageIndex: 0        // Tracks which image is currently shown in the lightbox
    };
  }


  // Runs automatically after the component is mounted to the page
  // Used here to fetch product data from the backend server
  componentDidMount() {
    axios
      .get("http://localhost:5000/items") // Request products from backend API
      .then((response) => {
        // Save the returned data into state
        this.setState({ products: response.data });
      })
      .catch((error) => {
        // Log any errors if the request fails
        console.error("Error fetching products:", error);
      });
  }


  // Opens the lightbox popup when a product image is clicked
  openLightbox = (images) => {

    // Prevent opening if no images exist
    if (!images || images.length === 0) return;

    this.setState({
      lightboxImages: images, // Store all images of the clicked product
      imageIndex: 0,          // Start by showing the first image
      lightboxOpen: true      // Display the lightbox
    });
  };


  // Closes the lightbox popup
  closeLightbox = () => {
    this.setState({
      lightboxOpen: false, // Hide the lightbox
      lightboxImages: [],  // Clear stored images
      imageIndex: 0        // Reset image index
    });
  };


  // Shows the next image in the lightbox
  nextImage = () => {
    this.setState((prev) => ({
      // Move to the next image
      // % keeps the index looping back to 0 at the end
      imageIndex: (prev.imageIndex + 1) % prev.lightboxImages.length
    }));
  };


  // Shows the previous image in the lightbox
  prevImage = () => {
    this.setState((prev) => ({
      // Move backwards through images
      // + length ensures it loops correctly
      imageIndex:
        (prev.imageIndex - 1 + prev.lightboxImages.length) %
        prev.lightboxImages.length
    }));
  };


  // Function that renders the products table
  renderTable = () => {

    const { products } = this.state;

    // If products haven't loaded yet
    if (products.length === 0) {
      return <p>Loading products...</p>;
    }

    return (
      <table className="tablecontent">

        {/* Table column headers */}
        <thead>
          <tr>
            <th>Product</th>
            <th>Image</th>
            <th>Type</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>

          {/* Loop through each product and create a table row */}
          {products.map((product) => (
            <tr key={product._id || product.itemName}>

              {/* Product name */}
              <td>{product.itemName}</td>

              {/* Product image */}
              <td>

                {/* If the product has images */}
                {product.image && product.image.length > 0 ? (

                  <img
                    src={product.image[0]} 
                    // Always show the first image as the thumbnail

                    alt={product.itemName}

                    className="product-thumbnail productImages"

                    // When clicked, open the lightbox with all product images
                    onClick={() => this.openLightbox(product.image)}
                  />

                ) : (
                  // If no image exists
                  <span>No image</span>
                )}

              </td>

              {/* Product description/type */}
              <td>{product.description}</td>

              {/* Product price (handles different property names) */}
              <td>{product.price ?? product.Price ?? "N/A"}</td>

            </tr>
          ))}

        </tbody>
      </table>
    );
  };


  // Main render function for the page
  render() {

    const { lightboxOpen, lightboxImages, imageIndex } = this.state;

    return (
      <div className="content">

        {/* Page Title */}
        <h1 className="textTypeCursive">
          <b>Products</b>
        </h1>


        {/* Two tables side by side */}
        <div className="tables-container">

          {/* Wholesale table */}
          <div className="textTypeCursive">
            <h2>
              <b>Wholesale Price Sheet</b>
            </h2>
            {this.renderTable()}
          </div>


          {/* Retail table
          <div className="textTypeCursive">
            <h2>
              <b>Retail Price Sheet</b>
            </h2>
            {this.renderTable()}
          </div> */}

        </div>


        {/* Lightbox popup for viewing larger images */}
        {lightboxOpen && (

          <div
            className="lightbox-overlay"
            onClick={this.closeLightbox} // Clicking outside closes the popup
          >

            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()} // Prevent overlay click when clicking inside
            >

              {/* Close button */}
              <button
                className="lightbox-close"
                onClick={this.closeLightbox}
              >
                ×
              </button>


              {/* Previous image button */}
              <button
                className="lightbox-prev"
                onClick={this.prevImage}
              >
                ‹
              </button>


              {/* Display the currently selected image */}
              <img
                src={lightboxImages[imageIndex]}
                alt="Expanded"
                className="lightbox-image"
              />


              {/* Next image button */}
              <button
                className="lightbox-next"
                onClick={this.nextImage}
              >
                ›
              </button>

            </div>

          </div>

        )}

      </div>
      
    );
  }
}