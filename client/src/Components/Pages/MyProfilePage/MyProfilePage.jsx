import React, { Component } from "react";
import UserService from '../../UserService';
import FormSinUp from '../../FormSingUp/FormSingUp.jsx';
import { Link } from "react-router-dom";
import "./MyProfilePage.css"
import Logout from "../../Logout/Logout.jsx"
import Nav from "../../Nav/Nav"
import Edit from "../../../icons/icons/edit.png"
import Notifications from "../../../icons/icons/notifications.png"

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
         <Nav  title={"Mi perfil"} 
        iconleft={Notifications} 
        iconright={Edit} 
        widthR={"20px"} 
        heigthR={"20px"} 
        widthL={"17px"} 
        heigthL={"17px"}
        />
        <div className="myProfile">
          <div className="myProfileHeader">
            <img src={this.state.user.image} />
            <div className="myProfileHeaderText">
              <p className="name">{this.state.user.username}</p>
              <p className="cumple">Cumpleaños:<br></br> 22 Junio, 21 años</p>
            </div>
          </div>
          <div className="sobreMi">
            <label>Sobre Mi</label><br></br>
            <textarea placeholder="Escribe una pequeña descripción sobre ti"></textarea>
          </div>
          <div className="educacionYTrabajo">
            <label>Educación y trabajo</label>
          </div>
          <div>
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
