import React, { Component } from "react";
import DatePicker from 'react-date-picker';
import DatePickerStyle from 'react-date-picker/dist/entry.nostyle';
import PlansService from '../../PlansService'
import './CreatePlanPage.css'
import hobbies from '../../HobbiesDiv/hobbies.json'
import Select from "react-select";
import Map from "../../Map/Map.jsx"

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
      center: {lat: 40.4378698, lng: -3.8196207 }
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
        console.log("response")
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

    return (
      <React.Fragment>

        <form onSubmit={this.handleNewPlan} className="new-plan-form">
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={e => this.handleChange(e)}
          />
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            onChange={e => this.handleChange(e)}
          />
          <label>Location</label>
          <button onClick={e =>this.showMap(e)}>
            {map}
          </button>

          <label>Date</label>
          <DatePickerStyle
            onChange={this.onChange}
            value={this.state.date}
          />
          <label>Limit</label>
          <input
            type="text"
            name="limit"
            onChange={e => this.handleChange(e)}
          />

           
           <div>
               <label>Tematica</label>
            <Select
            value={type}
            onChange={e => this.selectChange(e)}
            options={options}
            />
          </div>

          <input type="submit" value="new-plan" />
         
        </form>


      </React.Fragment>
    );
  }
}
