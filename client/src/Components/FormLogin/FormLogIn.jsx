import React, { Component } from "react";
import AuthService from "../AuthService"
import InputCreatePlan from "../InputCreatePlan/InputCreatePlan";
import {Link} from "react-router-dom"
import Logo from "../../icons/icons/logo.png"
import "./FormLogIn.css"


export default class FormLogIn extends Component {
  constructor(props) {
    super(props);

    this.props=props;

    this.state = {
      username: "",
      password: ""
    };

    this.authService = new AuthService();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    this.authService.login({ username, password })
      .then(user => {
          this.props.getUserSession(user)
      });
  }


  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <img className="logoLogin" src={Logo}/>
        <form className="loginForm" onSubmit={this.handleFormSubmit}>
          <InputCreatePlan label="Usuario" placeholder="Tu usuario" name="username" handleChange= {this.handleChange} type={"text"}/>
          <InputCreatePlan label="Password" placeholder="Tu contraseña" name="password" handleChange={this.handleChange} type={"password"}/>
          <input className="loginButton" type="submit" value="Login" />
          <Link to={"/signup"}><span className="haveAccountLogin">¿Aún no tienes una cuenta? <span className="haveAccountLoginBold">Regístrate</span></span></Link>
        </form>
      </div>
    )
  }
}