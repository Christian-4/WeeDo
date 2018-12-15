import React, { Component } from 'react'
import PlanService from '../../PlansService'

export default class PlansPage extends Component {

  constructor(props){
    super(props)
    
    this.state = {
      plans: []
    }

    this.planService = new PlanService()
  }


  componentDidMount(){
    this.planService.getAllPlans()
    .then(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <React.Fragment>
        
      </React.Fragment>
    )
  }
}
