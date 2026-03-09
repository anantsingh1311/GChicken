import React, {Component} from "react";
import "../Order.css"
import "@fontsource/great-vibes"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import axios from "axios";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

export default class Order extends Component{

    constructor(props){
        super(props);

        this.state={
            items:[]
        }
    }

        componentDidMount(){
                    axios.get("http://localhost:5000/items") // Request products from backend API
                .then((response) => {
                    // Save the returned data into state
                    this.setState({ items: response.data });
                })
                .catch((error) => {
                    // Log any errors if the request fails
                    console.error("Error fetching products:", error);
                });
     }
    

    

    render(){
        const {items} = this.state;
        return(
        <div className="app-root">
            <h1 id="OrderNowHeading">Order Now</h1>
            <form className="formOrder">
                <div className="form-group">
                    <label>Select the porducts you are interested in: </label>
                   <Select
                    options={items.map((item) => ({
                    value: item,
                    label: `${item.itemName} || ${item.description} ||Rs ${item.price}`
                    }))}
                    isMulti
                />
                </div>
                <div className="form-group">
                <label>Please enter you email adress below(You can use any)</label>
                <input type="text" required/>
                </div>
                <div className="form-group">
                <label>Please enter your Physical Adress below:</label>

                <LoadScript googleMapsApiKey="YOUR_GOOGLE_API_KEY" libraries={["places"]}>

                    <Autocomplete>

                        <input type="text" className="form-control" placeholder="Start typing your address..." required />

                    </Autocomplete>

                </LoadScript>

                </div>
                <div className="form-group">
                <label>Adress line 2</label>
                <input type="text"/>
                <div/>
                <div className="form-group">
                <label>Adress line 3</label>
                <input type="text"/>
                </div>
                <div className="form-group">
                <label>City</label>
                <select>
                    <option>Gurgaon</option>
                    <option>Delhi(coming soon)</option>
                    <option>Noida(coming soon)</option>
                    <option>Faridabad(coming soon)</option>  
                </select>
                <label>Postcode:</label>
                <input type="text" required/>
                </div>
                <div className="submit-group">
               <input type="submit" value="Confirm Order" className="submit-order"/>
               </div>
                </div>
            </form>
        </div>)
    ;
    }
}