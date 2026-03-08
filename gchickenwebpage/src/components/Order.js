import React, {Component} from "react";
import "../App.css"
import "@fontsource/great-vibes"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import axios from "axios";

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
            <h1>Order Now</h1>
            <form>
                <div className="form-group">
                    <label>Select the porducts you are interested in: </label>
                    <br/>
                   <Select
                    options={items.map((item) => ({
                    value: item,
                    label: `${item.itemName} Rs ${item.price}`
                    }))}
                    isMulti
                />
                    <></>
                    
                </div>
            </form>
        </div>)
    ;
    }
}