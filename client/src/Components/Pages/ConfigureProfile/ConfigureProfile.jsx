import React, { Component } from 'react'
import Nav from "../../Nav/Nav.jsx"
import "./ConfigureProfile.css"
import { Link } from "react-router-dom";

export default class ConfigureProfile extends Component {
  render() {
    return (
      <React.Fragment>
         <Nav title={"Configurar tu perfil"}/>
         <p className="p-singup">
             ¿Quieres contestar una serie de preguntas para personalizar tu perfil para que podamos mostrarte
             perfiles similares a ti y puedan encontrarte otros usuarios?
         </p>
         <div>
         
         <Link to={"/configureHobbies"}><label className="decline-button"> Más tarde </label></Link>
         <Link to={"/basicData"}><button className="acept-button">¡Claro!</button></Link>
         </div>

      </React.Fragment>
    )
  }
}
