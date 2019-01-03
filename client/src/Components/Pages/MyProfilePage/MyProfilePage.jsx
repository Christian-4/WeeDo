import React, { Component } from "react";
import UserService from '../../UserService';
import FormSinUp from '../../FormSingUp/FormSingUp.jsx';
import { Link } from "react-router-dom";
import "./MyProfilePage.css"
import Logout from "../../Logout/Logout.jsx"
import Nav from "../../Nav/Nav"
import Edit from "../../../icons/icons/edit.png"

import Notifications from "../../../icons/icons/notifications.png"
import Input from '../../InputCreatePlan/InputCreatePlan.jsx'

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

  printLocation() {
    let location = this.state.user.location.split(',')
    return location[0] + ',' + location[1];
  }


  printHobbies() {
    let arrayHobbies = this.state.user.hobbies[0].split(',')

    return (
      <React.Fragment>

        <div className="myIntereses">

          <label>Intereses</label>
          <div className="hobbies">
            {arrayHobbies.map((hobbie) => {

              return (
                <div className="hobbie-mask">
                  <img src={require(`../../../icons/icons/${hobbie}.png`)} alt="h-image" className="hobbie-image"></img>
                </div>

              )
            })}
          </div>

        </div>

      </React.Fragment>
    )
  }

  printUser = () => {
    return (
      <React.Fragment>
        <Nav title={"Mi perfil"}
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
            </div>
          </div>
          <div className="sobreMi">
            <label>Sobre mi</label><br></br>

            {this.state.user.birthdate === null || this.state.user.birthdate === undefined
              ?
              <p className="birthdate"> Establece tu fecha de nacimiento </p>
              :
              <p className="birthdate-filled">{this.state.user.birthdate}</p>
            }

            {this.state.user.location === null || this.state.user.location === undefined
              ?
              <p className="location"> ¿Dónde vives? </p>
              :
              <p className="location-filled">{this.printLocation()}</p>
            }


            <textarea placeholder="Escribe una pequeña descripción sobre ti"></textarea>
          </div>

          <div>
            {this.state.user.hobbies === null || this.state.user.hobbies === undefined
              ?
              <Input label={"Intereses"} placeholder={"Añadir intereses"} />
              :
              this.printHobbies()
            }
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
        <Nav></Nav>
        {
          this.state.user !== null &&
          <div>{this.printUser()}</div>
        }
      </React.Fragment>
    )
  }
}
