import React, { Component } from "react";
import { geolocated } from "react-geolocated";
import Select from "react-select";
import AuthService from "../AuthService"
import UserService from "../UserService"
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Hobbies from "../HobbiesDiv/Hobbies.jsx"
import InputCreatePlan from "../InputCreatePlan/InputCreatePlan";
import Logo from "../../icons/icons/logo.png"
import "./FormSingUp.css"
import SearchInput from "../SearchInput/SearchInput.jsx"



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
      location: [],
      hobbies: [],
      redirect: false,
      displayHobbies: false
    }

    this.user = null

    this.authService = new AuthService();
    this.userService = new UserService();
  }


  hobbieClicked = (e) => {
    let hobbies = this.state.hobbies;
    hobbies.push(e.target.getAttribute('id'))
    this.setState({ ...this.state, hobbies: hobbies })
  }


  handleChange = (e) => {
    let { name, value } = e.target;
    if (name == "image") {
      this.setState({ ...this.state, image: e.target.files[0] })
    } else {

      this.setState({ [name]: value });
    }
  }


  selectChange = location => {
    //Select de localizacion
    this.setState({ ...this.state, location: location.value });

  };

  redirectLogin = () => {

    this.setState({ ...this.state, redirect: true })
  }

  ShowErrorMessage = (message) => {
    return <div>{message}</div>
  }

  handleFormSubmit = (e) => {

    e.preventDefault();

    const { username, password, password_confirm, email, location, image } = this.state;


      this.authService.signup({ username, password, password_confirm, email, location, image })
        .then(response => {

          if (response.data.message === "SignUp succesfull") {
            this.user = response.data.newUser;
            this.redirectLogin("login")
          }
         
        }).catch(err => console.log(err))
    


  }

  getViewHobbies = (props) => {

    return (<div><Hobbies selectHobbies={this.hobbieClicked} /></div>)
  }

  displayHobbies = () => {

    this.setState({
      displayHobbies: !this.state.displayHobbies
    })
  }

  locationChange = e => {
    let new_array = []
    new_array.push(e.place.place)
    new_array.push(e.place.coordinates.lat)
    new_array.push(e.place.coordinates.lng)
    this.setState({...this.state, location: new_array})
  }


  render() {

    const { location } = this.state;

    if (this.state && this.state.redirect) {
      return <Redirect to={{
        pathname: "/configureProfile",
        user: this.user
      }} />
    }
    
    let hobbies = ""

    if (this.state.displayHobbies) {

      hobbies = (
        <div>
          {this.getViewHobbies()}
        </div>

      )
    }

    return (
      <div className="signUp">
        <img className="logoSignup" src={Logo}/>
        <form onSubmit={this.handleFormSubmit}>
          <InputCreatePlan nameLabel={"name-label-signUp"} label="Usuario" placeholder="Tu usuario" name="username" handleChange={this.handleChange} type={"text"} />
          <InputCreatePlan nameLabel={"name-label-signUp"} label="Password" placeholder="Tu password" name="password" handleChange= {this.handleChange} type={"password"}/>
          <InputCreatePlan nameLabel={"name-label-signUp"} label="Confirma Password" placeholder="Repite password" name="password_confirm" handleChange= {this.handleChange} type={"password"}/>
          <InputCreatePlan nameLabel={"name-label-signUp"} label="Email" placeholder="Tu email" name="email" handleChange={this.handleChange} type={"email"} />
          <InputCreatePlan nameLabel={"name-label-signUp"} name="image" handleChange={this.handleChange} type={"file"} />
          {/* <InputCreatePlan label="Localizacion" placeholder="Tu localización" name="location" handleChange={this.handleChange} type={"text"} /> */}
          <SearchInput locationChange={e=>{this.locationChange(e)}} boxStyle = {'input-signup'} listStyle={'list-style-signUp'}/>
            <input className="signupButton" type="submit" value="Siguiente" />
        </form>
        <Link to={"/"}><button className="loginButton">¿Tienes cuenta?</button></Link>
        
      </div>
    );
  }
}
