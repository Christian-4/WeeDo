import React, { Component } from "react";
import { geolocated } from "react-geolocated";
import Select from "react-select";
import AuthService from "../AuthService"
import {Redirect} from "react-router-dom";
import { Link } from "react-router-dom";
import Hobbies from "../HobbiesDiv/Hobbies.jsx"

const options = [
    { value: "Madrid", label: "Madrid" },
    { value: "Barcelona", label: "Barcelona" },
    { value: "Valencia", label: "Valencia" }
  ];

export default class FormSingUp extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      email: "",
      image: "",
      location: "",
      hobbies: "",
      redirect: false,
      displayHobbies: false
    }

    this.authService = new AuthService();

    
  }

  handleChange = (e) => {
    let  {name, value} = e.target;
    this.setState({[name]: value});
  }


  handleFormSubmit = (e) => {
    e.preventDefault();

    const {username, password, email, image, location, hobbies} = this.state;

    this.authService.signup({username, password, email, image, location, hobbies})
    .then(user => {
      this.props.getUser(user)
      this.setState({username: '', password: '', redirect: true})
    });
  }

  getViewHobbies = (props) =>{

    return (<div><Hobbies /></div>) 
  }

  displayHobbies = () =>{
    console.log("Sonia")
    this.setState({
      displayHobbies: !this.state.displayHobbies
  })
  }

  render() {

    const { location } = this.state;

    if(this.state && this.state.redirect) {
        return <Redirect to="/" />
      }

    let hobbies =""

    if(this.state.displayHobbies){
      console.log("Sonia2")
      hobbies = (
        <div>
           {this.getViewHobbies()}
        </div>
       
      )
    } 

    return (

        
      <div>
        <h2>Signup</h2>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={e => this.handleChange(e)}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={e => this.handleChange(e)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="password-confirm"
            onChange={e => this.handleChange(e)}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={e => this.handleChange(e)}
          />
         

          {!this.props.isGeolocationAvailable || !this.props.isGeolocationEnabled  ? 
          <div>
               <label>Location</label>
            <Select
            value={location}
            onChange={e => this.handleChange(e)}
            options={options}
            />
          </div>
    
            :
            
            <div>
                 this.props.coords
            </div>
          }

          {hobbies}

          <input type="submit" value="Signup" />
        </form>
        <button className="btn" onClick={this.displayHobbies}> Next</button>
      </div>
    );
  }
}
