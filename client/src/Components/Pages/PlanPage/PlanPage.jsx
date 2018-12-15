import React, { Component } from 'react'
import PlansService from '../../PlansService'
import { Link } from "react-router-dom";


export default class PlanPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      plan_id: this.props.match.params.id,
      plan: null
    }

    this.plansService = new PlansService();


  }


  componentDidMount(){
    this.plansService.getPlan(this.state.plan_id)
    .then(response =>{
         this.setState({...this.state,plan: response.plan })
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

  
  printPlan = () =>{
    const {title, description, date, chat} = this.state.plan
    return (
      <React.Fragment>
        <div>
          <p>{title}</p>
          <p>{description}</p>
          <p>{date}</p>
          <Link to={`/plan/${chat}`}><p> Chat</p></Link>
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (
      
      <div>
          {
          this.state.plan !== null && 
          <div>{this.printPlan()}</div>
       
        }
        <form onSubmit={this.handleDeletePlan} className="new-plan-form">
          <input type="submit" value="delete-plan" />
        </form>
      </div>
    )
  }
}
