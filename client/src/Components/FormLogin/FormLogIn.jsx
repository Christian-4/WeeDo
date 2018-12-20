// import React, { Component } from "react";
// import AuthService from "../AuthService"
// import Logout from "../Logout/Logout.jsx"


// export default class FormLogIn extends Component {
//   constructor(props) {
//     super(props);

//     this.props=props;

//     this.state = {
//       username: "",
//       password: ""
//     };

//     this.authService = new AuthService();
//   }

//   handleFormSubmit = (e) => {
//     e.preventDefault();

//     const { username, password } = this.state;

//     this.authService.login({ username, password })
//       .then(user => {
//           this.props.getUserSession(user)
//       });
//   }


//   handleChange = (e) => {
//     const { name, value } = e.target;

//     this.setState({ [name]: value });
//   }

//   render() {
//     return (
//       <div>
//         <h2>Login</h2>
//         <form onSubmit={this.handleFormSubmit}>
//           <label>Username</label>
//           <input type="text" name="username" onChange={e => this.handleChange(e)} />

//           <label>Password</label>
//           <input type="password" name="password" onChange={e => this.handleChange(e)} />

//           <input type="submit" value="Login" />
//         </form>
//         <Logout></Logout>
//       </div>
//     )
//   }
// }

import React, { Component } from "react";
import AuthService from "../AuthService"
import InputCreatePlan from "../InputCreatePlan/InputCreatePlan";
import {Link} from "react-router-dom"
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
        <h2>Logo</h2>
        <form className="loginForm" onSubmit={this.handleFormSubmit}>
          <InputCreatePlan label="Usuario" placeholder="Tu usuario" name="username" handleChange= {this.handleChange} type={"text"}/>
          <InputCreatePlan label="Password" placeholder="Tu contraseña" name="password" handleChange={this.handleChange} type={"password"}/>
          <input className="loginButton" type="submit" value="Login" />
          <Link to={"/signup"}><button className="signupButton">Crear cuenta</button></Link>
        </form>
      </div>
    )
  }
}