import React, { Component } from "react";
import UserService from '../../UserService';
import FormSinUp from '../../FormSingUp/FormSingUp.jsx';
import { Link } from "react-router-dom";
import "./MyProfilePage.css"
import Logout from "../../Logout/Logout.jsx"
import Nav from "../../Nav/Nav"

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    }

    this.UserService = new UserService()
  }

  componentDidMount() {

    this.UserService.getUser()
      .then(response => {
        this.setState({ ...this.state, user: response.user })
      })
  }

  printUser = () => {
    return (
      <React.Fragment>
        <Nav />
        <div className="myProfile">
          <div className="myProfileHeader">
            <img src={this.state.user.image} />
            <div className="myProfileHeaderText">
              <p className="name">{this.state.user.username}</p>
              <p className="cumple">Cumpleaños:<br></br> 22 Junio, 21 años</p>
            </div>
          </div>
          <div className="sobreMi">
            <label>Sobre mi</label><br></br>
            <textarea placeholder="Escribe una pequeña descripción sobre ti"></textarea>
          </div>
          <div className="educacionYTrabajo">
            <label>Educación y trabajo</label><br></br>
            <input type="text" placeholder="Añade educación"></input><br></br>
            <input type="text" placeholder="Añade trabajo"></input>
          </div>
          <div className="myIntereses">
            <label>Intereses</label>
            <div className="myInteresesDivs">
              {this.state.user.hobbies.map(function(hobby,index){
                return(
                  <div className="myInteresesDiv">
                   
                  </div>
                )
              })}
            </div>
          </div>
          <div className="logoutButton">
            <Logout></Logout>
          </div>
        </div>


      </React.Fragment>

    )
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.user !== null &&
          <div>{this.printUser()}</div>
        }


      </React.Fragment>
    )
  }
}
