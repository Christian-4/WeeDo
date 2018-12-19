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
      showMap: false,
      center: { lat: 40.4378698, lng: -3.8196207 },
      redirect: false,
      planId: null,
      showCalendar: false,
      date : {
        year: "",
        month: "",
        day: "",
        hour: 0,
        min: 0,
        seg:0
      }
    };

  

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

    let newDate = new Date(
      this.state.date.year,
      this.state.date.month - 1,
      this.state.date.day,
      this.state.date.hour,
      this.state.date.min,
      this.state.date.seg
    );

  
    console.log(this.state.date)
     


    const { title, description, location, date, limit, hobby } = this.state;

    this.plansService
      .createNewPlan({ title, description, location, newDate, date, limit, hobby })
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

  onChange = date => this.setState(console.log(date));

  dateChange = date => {
    let arrDate = date.valueText.split("/");
    let day = arrDate[0];
    let month = arrDate[1];
    let year = arrDate[2];

    console.log(date)

    this.setState({...this.state,date: day,month,year})
  };

  timeChange = time => {
    let arrTime = time.valueText.split(":");
    let hour = parseInt(arrTime[0]);
    let min = parseInt(arrTime[1].split(" ")[0]);
    let seg = 0;

    this.setState({...this.state,date: hour,min,seg})
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
    console.log("mostra calendar");
    this.setState({ ...this.state, showCalendar: !this.state.showCalendar });
  };

  locationChange = e => {
    this.setState({...this.state, location: {coordinates: e.place.coordinates, place: e.place.place}})
  }

  render() {
    const { type } = this.state.hobby;
    const map = this.renderMap();

    if (this.state.redirect) {
      return <Redirect to={`/plan/${this.state.planId}`} />;
    }

    return (
      <React.Fragment>
        <Nav title={"Crea un plan"} />

        <form onSubmit={this.handleNewPlan} className="new-plan-form">
          <Input
            name={"title"}
            label={"Nombre del plan"}
            placeholder={"Título del plan"}
            handleChange={this.handleChange}
          />
          <Input
            name={"description"}
            label={"Descripción"}
            placeholder={"Breve descripción del plan"}
            handleChange={this.handleChange}
          />

          <div className="">
            <label className="date-label">Fecha y hora</label>
            <div className="div-date-time">
              <DataTime timeChange={this.timeChange} />
              <DataDate dateChange={this.dateChange} />
            </div>
          </div>

          <SearchInput locationChange={e=>{this.locationChange(e)}}/>
    

          <Input
            name={"hobby"}
            label={"Etiquetas"}
            placeholder={"Identifica el tipo de plan"}
            handleChange={this.handleChange}
          />
          <Input
            name={"limit"}
            label={"Limit"}
            placeholder={"Número máximo de asistentes"}
            handleChange={this.handleChange}
          />

          {/* <button onClick={e => this.showCalendar(e)}>Fecha</button> */}

          {/* {
            this.state.showCalendar &&  
            
            <Calendar 
            onChange={this.dateChange}
            value={this.state.date} 
           />

          } */}

          {/* <input id="date" type="date" onChange={e => this.dateChange(e)} /> */}

          {/* <input id="time" type="time" onChange={e => this.timeChange(e)} /> */}

          {/* <label>Location</label>
         <button onClick={e =>this.showMap(e)}>
         </button>
          {
            this.state.showMap && <div>{map}</div>
          } */}

          {/*  <input className="create-plan-button" type="submit" value="new-plan" /> */}

          <button className="create-plan-button" type="submit">
            Crear Plan
          </button>
        </form>
      </React.Fragment>
    );
  }
}
