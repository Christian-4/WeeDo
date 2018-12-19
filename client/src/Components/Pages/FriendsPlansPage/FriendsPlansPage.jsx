import React, { Component } from 'react'
import PlanService from '../../PlansService'
import { Link } from "react-router-dom";
import Nav from "../../Nav/Nav"
import "./FriendsPlansPage.css"
import FavIcon from "../../../icons/icons/Group4.png"

export default class FriendsPlansPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plans: null
    }

    this.planService = new PlanService()
  }


  componentDidMount() {
    this.planService.getFriendPlans()
      .then(response => {
        console.log(response)
        this.setState({ ...this.state, plans: response.plans })
      })
  }

  addPlanFav = (id) => {
    this.planService.addPlanFav(id)
      .then(response => {
        console.log(response)
      })
  }

  delPlanFav = (id) => {
    this.planService.delPlanFav(id)
      .then(response => {
        console.log(response)
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
                  <img src="https://as01.epimg.net/tikitakas/imagenes/2017/08/16/portada/1502909050_145252_1502909120_noticia_normal.jpg" />
                </div>
                <div className="allPlanCardImageOwner">
                  <img src={plan.owner.image} />
                </div>
              </div>
              <div className="allPlanCardRight">
                <div className="allPlanCardDate">{plan.date}<img onClick={() => addPlanFav(plan._id)} src={FavIcon} /></div>
                <div className="allPlanCardTitle">{plan.title}</div>
                <div className="allPlanCardUsers"><span className="textasist">Van a asistir </span><span>{plan.users.map(function (user, index) {
                  return (
                    <Link to={`/profile/${user._id}`}><img src={user.image} /></Link>
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
        <Nav></Nav>
        <div className="allPlanSelected">
          <p><Link to={"/plans"}>En Madrid</Link></p>
          <div className="misConexiones">
            <p><Link to={"/friendsplans"}>Mis conexiones</Link></p>
            <hr></hr>
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


