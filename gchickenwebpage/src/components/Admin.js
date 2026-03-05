import React, {Component} from "react";
import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "../Admin.css"

//to retrieve user data:
import axios from "axios"; 

export default class Admin extends Component{

    constructor(props){
        //Default Constructor
        super(props)

        this.state={
            users:[] //Array to store the users 
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/user")
        .then((response)=>{
            //setting the current state of users to the resposne recieved from MongoDB Backend
            this.setState({users: response.data});
        }).catch((error)=>{
            console.error(error);
        })
    }
onButtonPressed = (id) => {
    console.log("Attempting to delete user with ID:", id);
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    axios.delete(`http://localhost:5000/user/${id}`)
        .then(() => {
            console.log("Deleted User");
            this.setState({
                users: this.state.users.filter(user => user._id !== id)
            });
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
        });
}

    render(){
        const {users} = this.state;
        return(
            
        <div className="app-root">
            
            <div className="content">
            <h1>Admin Page</h1>
            <h2><u>Captured User info: </u></h2>
            </div>
            <table className="table">
                <thead>
                <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Firm Name</th>
                <th>Email Id</th>
                <th>Mobile</th>
                <th>Action</th>
                </tr>
                </thead>

                <tbody>
                    {/* const {users} = this.state; */}
                    {users.map((user)=>(
                        <tr key={user._id || user.username}>
                            <td>{user.username}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.firmname}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td><button
                className="DeleteButton"
                onClick={() => this.onButtonPressed(user._id)}
            >
                Delete
            </button></td>
                        </tr>
                    ))}
                </tbody>
               

            </table>
            
        </div>)
    ;
    }
}


