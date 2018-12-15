import React, { Component } from "react";
import DatePicker from 'react-date-picker';
import DatePickerStyle from 'react-date-picker/dist/entry.nostyle';
import PlansService from '../../PlansService'
import './CreatePlanPage.css'
import hobbies from '../../HobbiesDiv/hobbies.json'
import Select from "react-select";


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
      hobby:""
    }

    this.plansService = new PlansService();


  }

  selectChange = type => {
    //Select de localizacion
    this.setState({...this.state, hobby: type.value} );
 
  };


  handleChange = (e) => {
    console.log(e.target)
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }


  handleNewPlan = (e) => {
    e.preventDefault();

    const { title, description, date, limit, hobby } = this.state;

    this.plansService.createNewPlan({ title, description, date, date, limit, hobby })
      .then(response => {
        console.log("response")
      });
  }

  onChange = date => this.setState({ date })


  render() {

    const { type } = this.state.hobby;


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
          <input
            type="text"
            name="location"
            onChange={e => this.handleChange(e)}
          />
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
