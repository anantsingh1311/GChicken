import React, {Component} from "react";
import "../Login.css"
import "@fontsource/great-vibes"; 
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class Login extends Component{
     constructor(props){
        super(props);
        this.OnUserNameChanged = this.OnUserNameChanged.bind(this);
        this.OnChangePassword = this.OnChangePassword.bind(this);
        this.OnSubmit = this.OnSubmit.bind(this);

        this.state={
            username:'',
            password:''

        }
    }

    OnChangePassword(e){
        this.setState({
            password:e.target.value
        });
    }
    OnUserNameChanged(e){
    this.setState({
        username: e.target.value
    });
    }

    OnSubmit(e){
        e.preventDefault();  
        const logInUser = {
            username: this.state.username,
            password: this.state.password
        };

       axios.post("http://localhost:5000/api/login", logInUser)
  .then(res => {
    alert("Login successful");
    // the issue is somewhere here because when we send the username, it gets stored but the role is not for some reason
    localStorage.setItem("user", JSON.stringify(res.data));
    console.log(res.data.username)

    // Redirect based on role
    if (res.data.role === "admin") {
        window.location = "/Admin";
    } else {
        window.location = "/";
    }
  })
  .catch(err => {
    console.error(err);
    alert("Invalid username or password");
  });
    }








    render(){
        return(
            <div className="app-root">
            <h1 id="titleLogin">Log-in Page</h1>
            <form className="form-login" onSubmit={this.OnSubmit}>
                <div className='form-group-login'>
                    <h3><b>Please Enter your username below:</b></h3>
                    <input type='text' required value={this.state.username} onChange={this.OnUserNameChanged}/>
                    <br/>
                    <h3><b>Please Enter your Password below:</b></h3>
                    <input type='password' required value={this.state.password} onChange={this.OnChangePassword}/>
                </div>
                <br/>
                <div >
                    <input type='submit' value='log-in' className='btn-btn primary submit-login'/>
                </div>
            </form>
            </div>
        );
    }
}


