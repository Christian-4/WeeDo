import React, { Component } from 'react'
import Nav from "../../Nav/Nav.jsx"
import Input from "../../StyleInput/StyleInput.jsx"
import DataDate from "../../DataDate/DataDate.jsx";
import { Link } from "react-router-dom"
import UserService from "../../UserService"
import "./BasicData.css"


export default class BasicData extends Component {

  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
      birthdate: null,
      name: null,
      phoneNumber: null,
      buttonClassName: "acept-basic-data-button invisible-button"
    }

    this.UserService = new UserService()
  }

  dateChange = date => {
    let arrDate = date.valueText.split("/");
    let day = parseInt(arrDate[1]);
    let month = parseInt(arrDate[0]);
    let year = parseInt(arrDate[2]);

    let newDate = this.state.date
    newDate.day = day
    newDate.month = month
    newDate.year = year

    let datenew = new Date(
      newDate.year,
      newDate.month - 1,
      newDate.day,  
      );

    this.setState({ ...this.state, birthdate: datenew })
  };

  handleChangeBasicData = e => {
    let { name, value } = e.target;
    this.setState({ ...this.state, [name]: value, buttonClassName: "acept-basic-data-button visible-button" })

  }

  saveData = () => {
    let { birthdate, name, phoneNumber } = this.state
    let updateUser = this.props.user
    updateUser.birthdate = birthdate
    updateUser.name = name
    updateUser.phoneNumber = phoneNumber

    this.UserService.saveBasicData(updateUser)
  }

  render() {
    return (
      <React.Fragment>
        <Nav title={"Configurar tu perfil"} />
        <p className="p-basic-data">Primero tus datos básicos</p>
        <Input name={"name"} handleChangeBasicData={this.handleChangeBasicData} placeholder={"Nombre completo"} label={"Nombre y apellidos"} numtelf={false} />
        <p className="date-basic-label">Fecha de nacimiento</p>
        <DataDate placeholder="Tu fecha de nacimiento" dateChange={this.dateChange} className={"date-div input-date-config date-div-configure"} />
        <Input name={"phoneNumber"} handleChangeBasicData={this.handleChangeBasicData} placeholder={"Número de teléfono"} label={"Número de teléfono"} numtelf={true} />
        <Link to={ {pathname:"/configureHobbies", user:this.props.user}}><button className={this.state.buttonClassName} onClick={this.saveData}>Siguiente</button></Link>
      </React.Fragment>
    )
  }
}
