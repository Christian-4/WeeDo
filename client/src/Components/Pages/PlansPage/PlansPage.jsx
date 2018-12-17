import React, { Component } from 'react'
import PlanService from '../../PlansService'
import { Link } from "react-router-dom";

export default class PlansPage extends Component {

  constructor(props){
    super(props)
    
    this.state = {
      plans: null
    }

    this.planService = new PlanService()
  }


  componentDidMount(){
    this.planService.getAllPlans()
    .then(response => {
      this.setState({...this.state,plans: response.plans})
    })
  }



  printPlans = () =>{
    return (
      <React.Fragment>
        {this.state.plans.map(function(plan,index){
         return(
           <div>
              <div>{plan.title}</div>
              <p>{plan.description}</p>
              <p>{plan.date}</p>
              <Link to={`/plan/${plan._id}`}><p>View Plan</p></Link>
           </div>
           
         )
        })}
      </React.Fragment>
    )
  }

  render() {
    return( 
      <React.Fragment>
        {
          this.state.plans !== null && 
          <div>{this.printPlans()}</div>
       
        }
       
        
      </React.Fragment>
      )
  }
}
