import React, {Component} from "react";
// import "../App.css"
import "../SignUp.css"
import "@fontsource/great-vibes"; 
import "bootstrap/dist/css/bootstrap.min.css";

export default class Signup extends Component{

    constructor(props){
        super(props);

        this.OnSubmit = this.OnSubmit.bind(this);

        this.state={


        }
    }

    OnSubmit(e){

        e.preventDfeault();
        console.log("Submitted!")
    }

   render(){
    return(
    <div className="app-root">

    <h1 id="title">User Sign Up Page</h1>
    <h2 id="Stitle">Interested in ordering?</h2>

    <p id="text">
<i>Please sign up below to create your account before placing an order.</i>
    </p>

    <form className="form" onSubmit={this.OnSubmit}>

<div className="form-group">
<label>Create a username</label>
<input type="text" required />
</div>

<div className="form-group">
<label>Enter your First Name</label>
<input type="text" required />
</div>

<div className="form-group">
<label>Enter your Last Name</label>
<input type="text" required />
</div>

<div className="form-group">
<label>Enter your Firm Name</label>
<input type="text" required />
</div>

<div className="form-group">
<label>Enter your Mobile Phone</label>
<input type="tel" required />
</div>

<div className="form-group">
<label>Enter your Email Address</label>
<input type="email" required />
</div>

<div className="form-group">
<label>Enter a Password</label>
<input type="password" required />
</div>
<br/>
<div className="form-group">
<label>Re-Enter your Password</label>
<input type="password" required />
</div>

<div className="submit-group">
<input type="submit" value="Submit" className="btn btn-primary submit-button"/>
</div>

    </form>

    </div>
);
}
}