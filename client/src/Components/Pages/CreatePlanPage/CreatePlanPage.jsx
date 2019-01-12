import React, { Component } from "react";

import PlansService from "../../PlansService";
import { Redirect } from "react-router-dom";
import "./CreatePlanPage.css";
import Map from "../../Map/Map.jsx";
import Nav from "../../Nav/Nav.jsx";
import Input from "../../InputCreatePlan/InputCreatePlan.jsx";
import DataTime from "../../DataTime/DataTime.jsx";
import DataDate from "../../DataDate/DataDate.jsx";
import SearchInput from "../../SearchInput/SearchInput.jsx"

//import Autocomplete from "react-google-autocomplete";

const options = [
  { value: "Deportes", label: "Deportes" },
  { value: "Educación y tecnología", label: "Educación y tecnología" },
  { value: "Ejercicio", label: "Ejercicio" }
];

export default class CreatePlanPage extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      description: "",
      location: null,
      limit: 0,
      hobby: "",
      type:"",
      showMap: false,
      center: { lat: 40.4378698, lng: -3.8196207 },
      redirect: false,
      planId: null,
      showCalendar: false,
      date : {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        min: 0,
        seg:0
      }

     
    }

    this.classNameButton = "button-type-no-selected"
    this.isButtonClicked = false;
  

    this.plansService = new PlansService();
  }


  locationPlan = coordinates => {
    this.setState({ ...this.state, location: coordinates });
  };

  handleChange = e => {

    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleNewPlan = e => {
    e.preventDefault();

    let date = new Date(
      this.state.date.year,
      this.state.date.month-1,
      this.state.date.day,
      this.state.date.hour+1,
      this.state.date.min,
      this.state.date.seg
    );


    const { title, description, location, newdate, limit, hobby, type} = this.state;

    this.plansService
      .createNewPlan({ title, description, location, date, limit, hobby, type })
      .then(response => {
        if (response.message === "Plan create!") {
          this.setState({
            ...this.state,
            redirect: true,
            planId: response.plan._id
          });
        }
      });
  };


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

  timeChange = time => {
    let arrTime = time.valueText.split(":");
    let hour = parseInt(arrTime[0]);
    let min = parseInt(arrTime[1].split(" ")[0]);
    let seg = 0;

    let typeHour =(arrTime[1].split(' ')[1])

    let newDate = this.state.date
    if(typeHour === "PM"){
      newDate.hour = hour+12
      
    }else{
      newDate.hour = hour
    }
   
    newDate.min = min
    newDate.seg = seg


    this.setState({...this.state,date:newDate})
  };

  showMap = e => {
    e.preventDefault();

    this.setState({ ...this.state, showMap: !this.state.showMap });
    this.renderMap();
  };

  renderMap = () => {
    return (
      <Map
        showMap={this.state.showMap}
        center={this.state.center}
        locationPlan={this.locationPlan}
        view={false}
      />
    );
  };

  showCalendar = e => {
    e.preventDefault();
    this.setState({ ...this.state, showCalendar: !this.state.showCalendar });
  };

  locationChange = e => {
    this.setState({...this.state, location: {coordinates: e.place.coordinates, place: e.place.place}})
  }

  buttonClicked = e => {
    if(this.isButtonClicked){
      e.target.className = "button-type-no-selected"
      this.isButtonClicked = false;
      this.setState({...this.state,type:""})
    }else{
      e.target.className = "button-type-selected"
      this.isButtonClicked = true;
      this.setState({...this.state,type:e.target.name})
    }
    
  }


  render() {
    
    if (this.state.redirect) {
      return <Redirect to={`/plan/${this.state.planId}`} />;
    }

    return (
      <React.Fragment>
        <Nav title={"Crea un plan"} />

        <div>
          <p className="title-question">¿Público, privado o cerrado?</p>
          <div className="type-plans-div">
            <div className="type-selected-plans">
              <p className="p-type-selected">Cualquiera puede apuntarse a un plan</p>
              <button name="public" className={this.classNameButton} onClick={e=>this.buttonClicked(e)}>Público</button>
            </div>
            <div className="type-selected-plans">
              <p className="p-type-selected">Establece el nivel del alcence al que puede mostrarse tú plan</p>
              <button  name="private" className={this.classNameButton} onClick={e=>this.buttonClicked(e)}>Conexiones</button>
            </div>
            <div className="type-selected-plans">
              <p className="p-type-selected">Solo a quienes tu invites pueden apuntarse al plan</p>
              <button name="closed" className={this.classNameButton} onClick={e=>this.buttonClicked(e)}>Cerrado</button>
            </div>
          </div>
        </div>

        <form onSubmit={this.handleNewPlan} className="new-plan-form">
          <Input
            name={"title"}
            label={"Nombre del plan"}
            placeholder={"Título del plan"}
            handleChange={this.handleChange}
          />
          {/* <Input
            name={"description"}
            label={"Descripción"}
            placeholder={"Breve descripción del plan"}
            handleChange={this.handleChange}

          /> */}
          <div className="div-description">
            <label className="label-description">Descripción</label>
            <textarea name="description" className="text-area-description" placeholder="Breve descripción del plan"  onChange={e => this.handleChange(e)}></textarea>
          </div>

          <div className="datePlanCreate">
            <label className="date-label">Fecha y hora</label>
            <div className="div-date-time">
              <DataDate dateChange={this.dateChange} className={"date-div input-date"} />
              <DataTime timeChange={this.timeChange} />
            </div>
          </div>

          <SearchInput locationChange={e=>{this.locationChange(e)}} boxStyle={'input'} listStyle={'list-style'}/>
    

          <Input
            name={"hobby"}
            label={"Etiquetas"}
            placeholder={"Identifica el tipo de plan"}
            handleChange={this.handleChange}
          />
          {/* <Input
            name={"limit"}
            label={"Limit"}
            placeholder={"Número máximo de asistentes"}
            handleChange={this.handleChange}
          /> */}

          <div className="limit-div">
            <label className="label-limit">Número máximo de personas</label>
            <input name="limit" className="input-limit" placeholder="Nº pers" onChange={e=>this.handleChange(e)}></input>
          </div>

          <button className="create-plan-button" type="submit">
            Crear Plan
          </button>
        </form>
      </React.Fragment>
    );
  }
}
