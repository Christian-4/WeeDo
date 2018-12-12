import React, { Component } from "react";
import DatePicker from 'react-date-picker';
import DatePickerStyle from 'react-date-picker/dist/entry.nostyle';
import BdService from '../../BdService'
import './CreatePlanPage.css'

export default class CreatePlanPage extends Component {

  constructor() {
    super();

    this.state = {
      title: "",
      description: "",
      location: null,
      date: new Date(),
      limit: 0
    }

    this.bdService = new BdService();

    
  }


  handleChange = (e) => {
    console.log(e.target)
    let  {name, value} = e.target;
    this.setState({[name]: value});
  }


  handleNewPlan = (e) => {
    e.preventDefault();

    const {title, description, date, limit} = this.state;

    this.bdService.newPlan({title, description, date, date, limit})
    .then(response => {
      console.log("response")
    });
  }

  onChange = date => this.setState({ date })


  render() {
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
           <input type="submit" value="new-plan" />
        </form>

      
      </React.Fragment>
    );
  }
}
