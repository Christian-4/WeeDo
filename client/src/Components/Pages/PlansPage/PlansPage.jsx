import React, { Component } from 'react'
import PlanService from '../../PlansService'
import UserService from "../../UserService";
import "./PlansPage.css"
import Nav from "../../Nav/Nav.jsx"
import { Link } from "react-router-dom";
import FavIcon from "../../../icons/icons/save.png"
import SavedIcon from "../../../icons/icons/saved.png"
import SearchIcon from "../../../icons/icons/white.png"
import Location from "../../../icons/icons/location.png"
 

export default class PlansPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      plans: null,
      user: null
    }

    this.planService = new PlanService()
    this.userService = new UserService()
  }


  componentDidMount() {
    this.planService.getAllPlans()
      .then(response => {
        this.userService.getUser()
          .then(responseuser => {
            console.log(response)
            this.setState({ ...this.state, plans: response.plans, user: responseuser.user })
          })
      })
  }

  addPlanFav = (id) => {
    this.planService.addPlanFav(id)
      .then(response => {
        console.log(response)
        this.planService.getAllPlans()
          .then(response => {
            this.userService.getUser()
              .then(responseuser => {
                console.log(response)
                this.setState({ ...this.state, plans: response.plans, user: responseuser.user })
              })
          })
      })
  }

  delPlanFav = (id) => {
    this.planService.delPlanFav(id)
      .then(response => {
        console.log(response)
        this.planService.getAllPlans()
          .then(response => {
            this.userService.getUser()
              .then(responseuser => {
                console.log(response)
                this.setState({ ...this.state, plans: response.plans, user: responseuser.user })
              })
          })
      })
  }

  printPlans = (addPlanFav, delPlanFav) => {
    let user = this.state.user
    return (
      <React.Fragment>
        {this.state.plans.map(function (plan, index) {
          return (
            <React.Fragment>
              { plan.owner._id === user._id
                ?
                ""
                :
                <div className="allPlanCard">
              <div className="allPlanCardLeft">
                <div className="allPlanCardImagePlan">
                  <img src="https://as01.epimg.net/tikitakas/imagenes/2017/08/16/portada/1502909050_145252_1502909120_noticia_normal.jpg" />
                </div>
                <div className="allPlanCardImageOwner">
                  <Link to={`/profile/${plan.owner._id}`}><img src={plan.owner.image} /></Link>
                </div>
              </div>
              <div className="allPlanCardRight">
                {
                  user.favourites.includes(plan._id) ?
                    (<div className="allPlanCardDate">{plan.date}<img onClick={() => delPlanFav(plan._id)} src={SavedIcon} /></div>)
                    :
                    (<div className="allPlanCardDate">{plan.date}<img onClick={() => addPlanFav(plan._id)} src={FavIcon} /></div>)
                }
                <div className="allPlanCardTitle"><Link to={`/plan/${plan._id}`}>{plan.title}</Link></div>
                <div className="allPlanCardUsers"><span className="textasist">Van a asistir </span><span>{plan.users.map(function (user, index) {
                  return (
                    <Link to={`/participants/${plan._id}`}><img src={user.image} /></Link>
                  )
                })}</span></div>
              </div>
            </div>
              }
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        <Nav 
        title={"Planes"}
         iconleft={SearchIcon}
        iconright={Location}
        widthR={"14px"} 
        heigthR={"20px"} 
        widthL={"20px"} 
        heigthL={"20px"}
          />
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
              {this.printPlans(this.addPlanFav, this.delPlanFav)}
            </div>
          }
        </div>
      </React.Fragment>
    )
  }
}
