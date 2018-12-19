import React, { Component } from 'react'
import PlanService from '../../PlansService'
import "./PlansPage.css"
import Nav from "../../Nav/Nav.jsx"
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
              <div className="allPlanCardTop">
                <div className="imageAllPlanCard">
                  <img src="https://as01.epimg.net/tikitakas/imagenes/2017/08/16/portada/1502909050_145252_1502909120_noticia_normal.jpg" />
                </div>
                <div className="allPlanCardTopRight">
                  <p className="allPlanCardFecha">{plan.date}<span className="allPlanCardIcon">Icon</span></p>
                  <p className="allPlanCardTitle"><Link to={`/plan/${plan._id}`}>{plan.title}</Link></p>
                  <span className="allPlanCardOwner">Creado por <Link to={`/profile/${plan.owner._id}`}><img src={plan.owner.image}/></Link></span>
                </div>
              </div>
              <div className="allPlanCardBot">
                <p>Van a asistir:</p> <span>{plan.users.map(function (user, index) {
                  return (
                    <Link to={`/profile/${user._id}`}><img src={user.image} /></Link>
                  )
                })}</span>
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
        <Nav></Nav>
        <div className="allPlanSelected">
          <div className="enMadrid">
            <p><Link to={"/plans"}>En Madrid</Link></p>
            <hr></hr>
          </div>
          <p><Link to={"/friendsplans"}>Mis conexiones</Link></p>
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
