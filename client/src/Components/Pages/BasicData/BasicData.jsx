import React, { Component } from 'react'
import Nav from "../../Nav/Nav.jsx"
import Input from "../../StyleInput/StyleInput.jsx"
import DataDate from "../../DataDate/DataDate.jsx";
export default class BasicData extends Component {

    constructor(props){
        super(props)

        this.state = {
            date:null
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
    
        console.log(this.state.date)
        this.setState({...this.state,date: newDate})
      };

  render() {
    return (
      <React.Fragment> 
           <Nav title={"Configurar tu perfil"}/>
           <p className="p-basic-data">Primero tus datos básicos</p>
           <Input placeholder={"Nombre completo"} label={"Nombre y apellidos"} />
        
           <DataDate placeholder="Tu fecha de nacimiento"  width={"375px"}/>
      </React.Fragment>
    )
  }
}
