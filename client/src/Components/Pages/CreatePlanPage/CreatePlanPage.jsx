import React, { Component } from "react";
import DatePicker from 'react-date-picker';
import DatePickerStyle from 'react-date-picker/dist/entry.nostyle';
import PlansService from '../../PlansService'
import {Redirect} from "react-router-dom";
import './CreatePlanPage.css'
import hobbies from '../../HobbiesDiv/hobbies.json'
import Select from "react-select";
import Map from "../../Map/Map.jsx"
import Nav from "../../Nav/Nav.jsx"
import Input from "../../InputCreatePlan/InputCreatePlan.jsx";



const options = [
  { value: "Deportes", label: "Deportes" },
  { value: "Educación y tecnología", label: "Educación y tecnología" },
  { value: "Ejercicio", label: "Ejercicio" }
]



export default class CreatePlanPage extends Component {

  constructor() {
    super();

    this.state = {
      title: "",
      description: "",
      location: null,
      date: new Date(),
      limit: 0,
      hobby:"",
      showMap : false,
      center: {lat: 40.4378698, lng: -3.8196207 },
      redirect: false,
      planId: null
    }

    this.plansService = new PlansService();


  }

  selectChange = type => {
    //Select de localizacion
    this.setState({...this.state, hobby: type.value} );
 
  };

  locationPlan = (coordinates) =>{
    this.setState({...this.state, location: coordinates})
  }


  handleChange = (e) => {
    console.log(e.target)
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  

  handleNewPlan = (e) => {
    e.preventDefault();
    const { title, description,location, date, limit, hobby } = this.state;
    this.plansService.createNewPlan({ title, description, location,date, date, limit, hobby })
      .then(response => {
          if(response.message === "Plan create!"){
            this.setState({...this.state, redirect : true, planId: response.plan._id})
          }
      });
  }

  onChange = date => this.setState({ date })

  showMap = (e) => {
    e.preventDefault()

    this.setState({...this.state, showMap: !this.state.showMap})
    this.renderMap()
  }

  renderMap = () => {
    
    return (  <Map showMap={this.state.showMap } center={this.state.center} locationPlan={this.locationPlan} view = {false}/> )
  }

  render() {

    const { type } = this.state.hobby;
    const map = this.renderMap()

    if(this.state.redirect){
      return <Redirect to={`/plan/${this.state.planId}`} />
    }

    return (
      <React.Fragment>

        <Nav title={"Crea un plan"}/>

        <form onSubmit={this.handleNewPlan} className="new-plan-form">
          <Input label={"Nombre del plan"} placeholder={"Título del plan"} handleChange={this.handleChange}></Input>
          <Input label={"Descripción"} placeholder={"Breve descripción del plan"} handleChange={this.handleChange}></Input>
          <Input label={"Lugar"} placeholder={"¿Dónde va a ser el plan?"} handleChange={this.handleChange}></Input>
          <Input label={"Etiquetas"} placeholder={"Identifica el tipo de plan"} handleChange={this.handleChange}></Input>
          <Input label={"Limit"} placeholder={"Número máximo de asistentes"} handleChange={this.handleChange}></Input>
          <label>Location</label>
         <button onClick={e =>this.showMap(e)}>
           {map}
         </button>




          <label>Date</label>
          <DatePickerStyle
            onChange={this.onChange}
            value={this.state.date}
          />
       

          
        {/*  <input className="create-plan-button" type="submit" value="new-plan" /> */}
          <button className="create-plan-button" type="submit">Crear Plan</button>
         
        </form>


      </React.Fragment>
    );
  }
}
