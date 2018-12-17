import React, { Component } from 'react'
import PlanService from '../../PlansService'
import "./PlansPage.css"
import { Link } from "react-router-dom";

export default class PlansPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      plans: null
    }

    this.planService = new PlanService()
  }


  componentDidMount() {
    this.planService.getAllPlans()
      .then(response => {
        console.log(response)
        this.setState({ ...this.state, plans: response.plans })
      })
  }



  printPlans = () => {
    return (
      <React.Fragment>
        {this.state.plans.map(function (plan, index) {
          return (
            <div className="allPlanCard">
              <div className="imageAllPlanCard">
                <img src="https://as01.epimg.net/tikitakas/imagenes/2017/08/16/portada/1502909050_145252_1502909120_noticia_normal.jpg" />
              </div>
              <div className="allPlanCardRight">
                {plan.users.map(function (user, index) {
                  return (
                    <img src={user.image} />
                  )
                })}
              </div>
            </div>
          )
        })}
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="allPlanSelected">
          <p>En Madrid</p>
          <p>Mis conexiones</p>
        </div>
        <div className="allPlans">
          {
            this.state.plans !== null &&
            <div>
              {this.printPlans()}
            </div>
          }
        </div>
      </React.Fragment>
    )
  }
}
