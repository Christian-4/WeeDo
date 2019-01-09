import React, { Component } from 'react'
import Nav from "../../Nav/Nav.jsx"
import Input from "../../StyleInput/StyleInput.jsx"
import DataDate from "../../DataDate/DataDate.jsx";
import {Link} from "react-router-dom"
import "./BasicData.css"
export default class BasicData extends Component {

    constructor(props){
        super(props)

        this.state = {
            date: new Date(),
            birthday:null,
            name:null,
            phoneNumber:null,
            buttonClassName: "acept-basic-data-button invisible-button"
        }
    }

    dateChange = date => {
        let arrDate = date.valueText.split("/");
        let day = parseInt(arrDate[1]);
        let month =parseInt (arrDate[0]);
        let year = parseInt(arrDate[2]);
    
        let newDate = this.state.date
        newDate.day = day
        newDate.month = month
        newDate.year = year
    
        this.setState({...this.state,date: newDate})
      };

      handleChangeBasicData = e =>{
        let {name, value} = e.target;
        this.setState({...this.state,[name]:value,buttonClassName:"acept-basic-data-button visible-button"})

    }

  render() {
    return (
      <React.Fragment> 
           <Nav title={"Configurar tu perfil"}/>
           <p className="p-basic-data">Primero tus datos básicos</p>
           <Input name={"name"} handleChangeBasicData={this.handleChangeBasicData} placeholder={"Nombre completo"} label={"Nombre y apellidos"} numtelf={false} />
            <p className="date-basic-label">Fecha de nacimiento</p>
           <DataDate placeholder="Tu fecha de nacimiento" dateChange={this.dateChange}  className={"date-div input-date-config date-div-configure"}/>
           <Input name={"phoneNumber"} handleChangeBasicData={this.handleChangeBasicData}  placeholder={"Número de teléfono"} label={"Número de teléfono"} numtelf={true}/>
           <Link to={"/configureHobbies"}><button className={this.state.buttonClassName}>Siguiente</button></Link>
      </React.Fragment>
    )
  }
}
