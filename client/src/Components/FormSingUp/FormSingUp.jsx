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
      hobbies: [],
      redirect: false,
      displayHobbies: false
    }

    this.authService = new AuthService();

    
  }


  hobbieClicked =  (e) => {
    let hobbies = this.state.hobbies;
    hobbies.push(e.target.getAttribute('id'))
    this.setState({...this.state,hobbies: hobbies})
  }


  handleChange = (e) => {
    let  {name, value} = e.target;
      if(name == "image") {
        this.setState({...this.state, image: e.target.files[0]})
      } else {
      
        this.setState({[name]: value});
      }
  }


  selectChange = location => {
    //Select de localizacion
    this.setState({...this.state, location: location.value} );
 
  };


  handleFormSubmit = (e) => {
  
    e.preventDefault();

    console.log(this.state.location);
    const {username, password, password_confirm,email,location, image, hobbies} = this.state;

//    console.log(username, password, password_confirm, email, image, location, hobbies)


    this.authService.signup({username, password, password_confirm, email, location, image, hobbies})
    .then(user => {
      console.log(user)
    });
  }

  getViewHobbies = (props) =>{

    return (<div><Hobbies selectHobbies={this.hobbieClicked} /></div>) 
  }

  displayHobbies = () =>{

    this.setState({
      displayHobbies: !this.state.displayHobbies
  })
  }

  render() {

    const { location } = this.state;

    if(this.state && this.state.redirect) {
        return <Redirect to="/" />
      }

    let hobbies = ""

    if(this.state.displayHobbies){
 
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
            name="password_confirm"
            onChange={e => this.handleChange(e)}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={e => this.handleChange(e)}
          />
         

         <label>Photo</label>
         <input type="file" name="image" onChange={e => this.handleChange(e)} />

          {!this.props.isGeolocationAvailable || !this.props.isGeolocationEnabled  ? 
          <div>
               <label>Location</label>
            <Select
            value={location}
            onChange={e => this.selectChange(e)}
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
