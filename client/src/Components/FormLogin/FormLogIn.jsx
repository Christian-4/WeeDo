import React, { Component } from "react";
import AuthService from "../AuthService"


export default class FormLogIn extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };

    this.authService = new AuthService();
  }

  render() {
    return (
        <div>
          <h2>Login</h2>
          <form onSubmit={this.handleFormSubmit}>
            <label>Username</label>
            <input type="text" name="username" onChange={e => this.handleChange(e)} />
  
            <label>Password</label>
            <input type="password" name="password" onChange={e => this.handleChange(e)} />
  
            <input type="submit" value="Login"/>
          </form>
        </div>
      )
  }
}
