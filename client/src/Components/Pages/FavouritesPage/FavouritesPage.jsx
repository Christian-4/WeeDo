import React, { Component } from 'react'
import PlanService from '../../PlansService'
import { Link } from "react-router-dom";
import FavIcon from "../../../icons/icons/saved.png"
import "./FavouritesPage.css"
import Nav from "../../Nav/Nav.jsx"

export default class FavouritesPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plans: null
    }

    this.planService = new PlanService()
  }


  componentDidMount() {
    this.planService.getFavouritePlans()
      .then(response => {
        console.log(response)
        this.setState({ ...this.state, plans: response.favouriteplans })
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
        this.planService.getFavouritePlans()
          .then(response => {
            console.log(response)
            this.setState({ ...this.state, plans: response.favouriteplans })
          })
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
                <div className="allPlanCardDate">{plan.date}<img onClick={() => delPlanFav(plan._id)} src={FavIcon} /></div>
                <div className="allPlanCardTitle"><Link to={`/plan/${plan._id}`}>{plan.title}</Link></div>
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
        <div className="selectPlans">
          <div className="creados">
            <p><Link to={"/ownplans"}>Creados</Link></p>
          </div>
          <div className="voy">
            <p><Link to={"/plansgo"}>Voy a ir</Link></p>
          </div>
          <div className="guardados">
            <p><Link to={"/favourites"}>Guardados</Link></p>
            <hr></hr>
          </div>
        </div>
        <div className="allPlans">
          {
            this.state.plans !== null &&
            <div>
              {this.printPlans(this.addPlanFav, this.delPlanFav)}
            </div>
          }
        </div>
      </React.Fragment>
    )
  }
}