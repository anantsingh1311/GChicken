import React, { Component } from "react";
import "../Order.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

export default class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      cart: {},
      activeImageIndex: {}, // ✅ fixed placement
      form: {
        user: "",
        email: "",
        address1: "",
        address2: "",
        city: "Gurgaon",
        postcode: ""
      }
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  // ------------------------
  // FETCH DATA
  // ------------------------
  fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/items");
      this.setState({ items: res.data });
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  // ------------------------
  // IMAGE CAROUSEL
  // ------------------------
  handleImageChange = (itemId, direction, totalImages) => {
    this.setState((prevState) => {
      const currentIndex = prevState.activeImageIndex[itemId] || 0;

      let newIndex = currentIndex + direction;

      if (newIndex < 0) newIndex = totalImages - 1;
      if (newIndex >= totalImages) newIndex = 0;

      return {
        activeImageIndex: {
          ...prevState.activeImageIndex,
          [itemId]: newIndex
        }
      };
    });
  };

  // ------------------------
  // CART
  // ------------------------
  handleWeightChange = (item, value) => {
    this.setState((prevState) => ({
      cart: {
        ...prevState.cart,
        [item._id]: {
          ...item,
          weight: value
        }
      }
    }));
  };

  // ------------------------
  // FORM
  // ------------------------
  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState((prev) => ({
      form: {
        ...prev.form,
        [name]: value
      }
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { form, cart } = this.state;

    const payload = {
      ...form,
      items: Object.values(cart).filter(
        (item) => item.weight && item.weight > 0
      )
    };

    console.log("ORDER:", payload);

    // axios.post("http://localhost:5000/orders", payload);
  };


//   GoogleAddressForm = () => {
//   const [autocomplete, setAutocomplete] = useState(null);
//   const [address, setAddress] = useState("");

//   // Called when the Autocomplete instance is loaded
//   onLoad(autoC){
//     setAutocomplete(autoC);
//   };

//   // Called when a place is selected
//   onPlaceChanged = () => {
//     if (autocomplete !== null) {
//       const place = autocomplete.getPlace();
//       setAddress(place.formatted_address);
//       console.log(place); // For debugging: see full details
//     } else {
//       console.log("Autocomplete is not loaded yet!");
//     }
//   };



  

  // ------------------------
  // RENDER
  // ------------------------
  render() {
    const { items, cart, form, activeImageIndex } = this.state;
    

    return (
      <div className="container py-4">
        <h1 className="mb-4 text-center">🛒 Order Fresh Products</h1>

        {/* PRODUCT GRID */}
        <div className="row">
          {items.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">

                {/* IMAGE CAROUSEL */}
                <div className="image-carousel">
                  <img
                    src={
                      item.image && item.image.length > 0
                        ? item.image[activeImageIndex[item._id] || 0]
                        : "https://via.placeholder.com/300"
                    }
                    className="card-img-top"
                    alt={item.itemName}
                  />

                  {/* LEFT BUTTON */}
                  {item.image?.length > 1 && (
                    <button
                      type="button"
                      className="carousel-btn left"
                      onClick={() =>
                        this.handleImageChange(
                          item._id,
                          -1,
                          item.image.length
                        )
                      }
                    >
                      ‹
                    </button>
                  )}

                  {/* RIGHT BUTTON */}
                  {item.image?.length > 1 && (
                    <button
                      type="button"
                      className="carousel-btn right"
                      onClick={() =>
                        this.handleImageChange(
                          item._id,
                          1,
                          item.image.length
                        )
                      }
                    >
                      ›
                    </button>
                  )}
                </div>

                {/* PRODUCT INFO */}
                <div className="card-body">
                  <h5 className="card-title">{item.itemName}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="fw-bold">Rs {item.price} / kg</p>

                  {/* WEIGHT INPUT */}
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter weight (kg)"
                    value={cart[item._id]?.weight || ""}
                    onChange={(e) =>
                      this.handleWeightChange(item, e.target.value)
                    }
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER FORM */}
        <form onSubmit={this.handleSubmit} className="mt-4">
          <h4>Customer Details</h4>

          <div className="form-group mb-3">
            <label>Name</label>
            <input
              name="user"
              value={form.user}
              onChange={this.handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={this.handleInputChange}
              className="form-control"
              required
            />
          </div>

          {/* GOOGLE ADDRESS
          <div className="form-group mb-3">
            <label>Address</label>

            <LoadScript
              googleMapsApiKey="YOUR_GOOGLE_API_KEY"
              libraries={["places"]}
            >
              <Autocomplete>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Start typing your address..."
                  required
                />
              </Autocomplete>
            </LoadScript>
          </div> */}

          <div className="form-group mb-3">
            <label>Address Line 1</label>
            <input
              name="address2"
              value={form.address2}
              onChange={this.handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-group mb-3">
            <label>Address Line 2</label>
            <input
              name="address3"
              value={form.address3}
              onChange={this.handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-group mb-3">
            <label>City</label>
            <select
              name="city"
              value={form.city}
              onChange={this.handleInputChange}
              className="form-control"
            >
              <option>Gurgaon</option>
              <option>Delhi (coming soon)</option>
              <option>Noida (coming soon)</option>
              <option>Faridabad (coming soon)</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <label>Postcode</label>
            <input
              name="postcode"
              value={form.postcode}
              onChange={this.handleInputChange}
              className="form-control"
              required
            />
          </div>

          {/* SUBMIT */}
          <button type="submit" className="btn btn-success w-100 mt-3">
            Confirm Order
          </button>
        </form>
      </div>
    );
  }
}