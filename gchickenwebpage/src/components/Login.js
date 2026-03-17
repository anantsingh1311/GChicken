import React, {Component} from "react";
import {Link} from 'react-router-dom';
import "../Login.css"
import "@fontsource/great-vibes"; 
import "bootstrap/dist/css/bootstrap.min.css";
import brandLogo from "../brand-logo.JPG";

export default class Login extends Component{

    render(){
        return(
            <div className="app-root">
            <h1 id="titleLogin">Log-in Page</h1>
            <form className="form-login" onSubmit={this.OnSubmit}>
                <div className='form-group-login'>
                    <h3><b>Please Enter your username below:</b></h3>
                    <input type='text' required/>
                    <br/>
                    <h3><b>Please Enter your Password below:</b></h3>
                    <input type='password' required/>
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


