import React, { Component } from 'react'
import BdService from '../../BdService'

export default class PlanPage extends Component {

  constructor() {
    super();

    this.state = {
      plan_id : ""
    }

    this.bdService = new BdService();

    
  }


  handleDeletePlan = (e) => {
    e.preventDefault();

    const {plan_id} = this.state;

    this.bdService.deletePlan(plan_id)
    .then(response => {
      console.log("response")
    });
  }

  render() {

    return (
      <div>
          <form onSubmit={this.handleDeletePlan} className="new-plan-form">
          <input type="submit" value="delete-plan" />

          </form>
      </div>
    )
  }
}
