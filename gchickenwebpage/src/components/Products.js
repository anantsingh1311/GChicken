// import React, { Component } from "react";
// import "../App.css";
// import "../Products.css";
// import "@fontsource/great-vibes"; 
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

// export default class Products extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: [],
//        lightboxOpen: false
//     };
//   }
//   openLightbox = (images) => {
//   this.setState({ lightboxImages: images, currentImageIndex: 0, lightboxOpen: true });
// };

// closeLightbox = () => {
//   this.setState({ lightboxOpen: false });
// };

// nextImage = () => {
//   this.setState(prevState => ({
//     currentImageIndex: (prevState.currentImageIndex + 1) % prevState.lightboxImages.length
//   }));
// };

// prevImage = () => {
//   this.setState(prevState => ({
//     currentImageIndex:
//       (prevState.currentImageIndex - 1 + prevState.lightboxImages.length) %
//       prevState.lightboxImages.length
//   }));}

//   componentDidMount() {
//     axios.get("http://localhost:5000/items")
//       .then(response => {
//         this.setState({ products: response.data });
//         console.log("Products from API:", response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching products:", error);
//       });
//   }

//   render() {
//     const { products } = this.state;

//     return (
//       <div className="app-root">
//         <h1 className="textTypeCursive" id="titleProducts"><b>Products</b></h1>
//   <div className="tables-container">
//     <div className="textTypeCursive">
      
//       <h2 id="titleProducts"><b>Wholesale Price sheet</b></h2>
//       {products.length === 0 ? (
//         <p>Loading products...</p>
//       ) : (
//         <table className="tablecontent">
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Image</th>
//               <th>Type</th>
//               <th>Price</th>
//               <th>Select</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product, index) => (
//               <tr key={index}>
//                 <td>{product.itemName}</td>
//                <td>
//   {product.image && product.image.length > 0 ? (
//     <img
//       src={product.image[0]}
//       alt={product.itemName}
//       style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }}
//       onClick={() => this.openLightbox(product.images)}
//     />
//   ) : (
//     <span>No image</span>
//   )}
// </td>
//                 <td>{product.description}</td>
//                 <td>{product.price || product.Price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>

//     <div className="textTypeCursive">
//         <h2 id="titleProducts"><b>Retail Price sheet</b></h2>
//       <table className="tablecontent">
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Image</th>
//             <th>Type</th>
//             <th>Price</th>
//             <th>Select</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => (
//             <tr key={index}>
//               <td>{product.itemName}</td>
//            <td>
//   {product.image && product.image.length > 0 ? (
//     <img
//       src={product.image[0]}
//       alt={product.itemName}
//       style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }}
//       onClick={() => this.openLightbox(product.image)}
//     />
//   ) : (
//     <span>No image</span>
//   )}
// </td>
//               <td>{product.description}</td>
//               <td>{product.price || product.Price }</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
//   {this.state.lightboxOpen && (
//   <div className="lightbox-overlay" onClick={this.closeLightbox}>
//     <div className="lightbox-content" onClick={e => e.stopPropagation()}>
//       <button className="lightbox-close" onClick={this.closeLightbox}>×</button>
//       <button className="lightbox-prev" onClick={this.prevImage}>‹</button>
//       <img
//         src={this.state.lightboxImages[this.state.currentImageIndex]}
//         alt="Expanded"
//         style={{ maxWidth: "80vw", maxHeight: "80vh" }}
//       />
//       <button className="lightbox-next" onClick={this.nextImage}>›</button>
//     </div>
//   </div>
// )}
// </div>



//     );
//   }
// }
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
      products: [],
      lightboxOpen: false,
      lightboxImage: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/items")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  openLightbox = (image) => {
    if (!image) return;

    this.setState({
      lightboxImage: image, // strictly product.image
      lightboxOpen: true,
    });
  };

  closeLightbox = () => {
    this.setState({
      lightboxOpen: false,
      lightboxImage: "",
    });
  };

  renderTable = () => {
    const { products } = this.state;

    if (products.length === 0) {
      return <p>Loading products...</p>;
    }

    return (
      <table className="tablecontent">
        <thead>
          <tr>
            <th>Product</th>
            <th>Image</th>
            <th>Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id || product.itemName}>
              <td>{product.itemName}</td>

              <td>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.itemName}
                    className="product-thumbnail"
                    onClick={() => this.openLightbox(product.image)}
                  />
                ) : (
                  <span>No image</span>
                )}
              </td>

              <td>{product.description}</td>

              <td>{product.price ?? product.Price ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  render() {
    const { lightboxOpen, lightboxImage } = this.state;

    return (
      <div className="app-root">
        <h1 className="textTypeCursive">
          <b>Products</b>
        </h1>

        <div className="tables-container">
          <div className="textTypeCursive">
            <h2><b>Wholesale Price Sheet</b></h2>
            {this.renderTable()}
          </div>

          <div className="textTypeCursive">
            <h2><b>Retail Price Sheet</b></h2>
            {this.renderTable()}
          </div>
        </div>

        {lightboxOpen && (
          <div className="lightbox-overlay" onClick={this.closeLightbox}>
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={this.closeLightbox}
              >
                ×
              </button>

              <img
                src={lightboxImage}
                alt="Expanded"
                className="lightbox-image"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}