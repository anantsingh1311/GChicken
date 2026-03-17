import React, {Component} from "react";
import "../SignUp.css"
import "@fontsource/great-vibes"; 
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class Signup extends Component{

    constructor(props){
        super(props);

        
        this.OnSubmit = this.OnSubmit.bind(this);
        
        this.OnUsernameChanged = this.OnUsernameChanged.bind(this);
        
        this.OnFirstNameChanged = this.OnFirstNameChanged.bind(this);
        
        this.OnLastNameChanged = this.OnLastNameChanged.bind(this);
        
        this.OnFirmChanged = this.OnFirmChanged.bind(this);
        
        this.OnEmailChanged = this.OnEmailChanged.bind(this);
        
        this.OnMobileChanged = this.OnMobileChanged.bind(this);
        
        this.OnPasswordChanged = this.OnPasswordChanged.bind(this);
        
        this.OnPasswordCheckChanged = this.OnPasswordCheckChanged.bind(this);

        this.state={
            username:"",
            
            firstname:"",
            
            lastname:"",
            
            firmname:"",
            
            mobile:"",
            
            email:"",
            
            password:"",
            
            passwordCheck:""


        }
    }

    OnUsernameChanged(e){
        this.setState({

            username:e.target.value
       
        });
    }
    OnFirstNameChanged(e){
        this.setState({
            
            firstname:e.target.value
       
        });
    }
    OnMobileChanged(e){
        this.setState({
            mobile:e.target.value
        })
    }
    OnLastNameChanged(e){
        this.setState({
            
            lastname:e.target.value
        
        })
    }
    OnFirmChanged(e){
        this.setState({
           
            firmname:e.target.value
        
        })
    }
    OnEmailChanged(e){
        this.setState({
           
            email:e.target.value
        
        })
    }
    OnPasswordChanged(e){
        this.setState({
            
            password:e.target.value
        
        })
    }
    OnPasswordCheckChanged(e){
        this.setState({
            
            passwordCheck:e.target.value
        
        })
    }





OnSubmit(e){
    e.preventDefault();

    if (this.state.password !== this.state.passwordCheck) {
        alert("The passwords don't match, please re-enter your password");
        return;
    }

    console.log("SUBMIT TRIGGERED");

    const user = {
        username: this.state.username,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        firmname: this.state.firmname,
        mobile: this.state.mobile,
        email: this.state.email,
        password: this.state.password
    };

    axios.post('http://localhost:5000/user/add', user)
    .then(res => {
        console.log(res.data);
        alert("Credentials Created!");
        window.location.href = "/login";
    })
    .catch(err => {
        if (err.response) {
            console.log("BACKEND ERROR:", err.response.data);
        } else {
            console.log(err);
        }
    });

    this.setState({
        username: '',
        password: '',
        passwordCheck: ''
    });
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
<label>Create a username:</label>
<input type="text" required  value={this.state.username} onChange={this.OnUsernameChanged} />
</div>

<div className="form-group">
<label>Enter your First Name:</label>
<input type="text" required value={this.state.firstname} onChange={this.OnFirstNameChanged} />
</div>

<div className="form-group">
<label>Enter your Last Name:</label>
<input type="text" required value={this.state.lastname} onChange={this.OnLastNameChanged} />
</div>

<div className="form-group">
<label>Enter your Firm Name:</label>
<input type="text" required value={this.state.firmname} onChange={this.OnFirmChanged}/>
</div>

<div className="form-group">
<label>Enter your Mobile Phone:</label>
<input type="tel" required value={this.state.mobile} onChange={this.OnMobileChanged}/>
</div>

<div className="form-group">
<label>Enter your Email Address:</label>
<input type="email" required vlaue={this.state.email} onChange={this.OnEmailChanged}/>
</div>

<div className="form-group">
<label>Enter a Password:</label>
<input type="password" required value={this.state.password} onChange={this.OnPasswordChanged} />
</div>
<br/>
<div className="form-group">
<label>Re-Enter your Password:</label>
<input type="password" required value={this.state.passwordCheck} onChange={this.OnPasswordCheckChanged}/>
</div>

<div className="submit-group">
<input type="submit" value="Submit" className="btn-btn primary submit-button"/>
</div>
</form>
 </div>
);
}
}