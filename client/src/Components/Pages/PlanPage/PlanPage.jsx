import React, { Component } from 'react'
import PlansService from '../../PlansService'

export default class PlanPage extends Component {

  constructor() {
    super();

    this.state = {
      plan_id: ""
    }

    this.plansService = new PlansService();


  }


  componentDidMount(){
    this.plansService.getPlan(this.state.plan_id)
    .then(response =>{
      console.log(response)
      // this.setState({...this.state,plan_id: })
    })
  }

  handleDeletePlan = (e) => {
    e.preventDefault();

    const { plan_id } = this.state;

    this.plansService.deletePlan(plan_id)
      .then(response => {
        console.log("response " + response)
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
