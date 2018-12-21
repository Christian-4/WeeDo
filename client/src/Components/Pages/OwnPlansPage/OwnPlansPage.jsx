import React, { Component } from 'react'
import PlanService from '../../PlansService'
import "./OwnPlansPage.css"
import { Link } from "react-router-dom";
import ChatIcon from "../../../icons/icons/chat.png"
import Nav from "../../Nav/Nav.jsx"
import SearchIcon from "../../../icons/icons/white.png"
import NotificationIcon from "../../../icons/icons/notifications.png"

export default class OwnPlansPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plans: null
    }

    this.planService = new PlanService()
  }


  componentDidMount() {
    this.planService.getOwnPlans()
      .then(response => {
        console.log(response)
        this.setState({ ...this.state, plans: response.plans })
      })
  }



  printPlans = (addPlanFav, delPlanFav) => {
    return (
      <React.Fragment>
        {this.state.plans.map(function (plan, index) {
          return (
            <div className="allPlanCard">
              <div className="allPlanCardLeft">
                <div className="allPlanCardImagePlan">
                  <img src={plan.image} />
                </div>
              </div>
              <div className="allPlanCardRight">
                <div className="allPlanCardDate">{plan.date}<Link to={`/chat/${plan.chat}`}><img className="chat" src={ChatIcon} /></Link></div>
                <div className="allPlanCardTitle"><Link to={`/plan/${plan._id}`}>{plan.title}</Link></div>
                <div className="allPlanCardUsers"><span className="textasist">Van a asistir </span><span>{plan.users.map(function (user, index) {
                  return (
                    <Link to={`/participants/${plan._id}`}><img src={user.image} /></Link>
                  )
                })}</span></div>
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
        <Nav  title={"Mis planes"} 
        iconleft={SearchIcon} 
        iconright={NotificationIcon} 
        widthR={"20px"} 
        heigthR={"20px"} 
        widthL={"20px"} 
        heigthL={"20px"}
        />
        <div className="selectPlans">
          <div className="creados">
            <p><Link to={"/ownplans"}>Creados</Link></p>
            <hr></hr>
          </div>
          <div>
            <p><Link to={"/plansgo"}>Voy a ir</Link></p>
          </div>
          <div>
            <p><Link to={"/favourites"}>Guardados</Link></p>
          </div>
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


