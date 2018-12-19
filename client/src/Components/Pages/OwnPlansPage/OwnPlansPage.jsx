import React, { Component } from 'react'
import PlanService from '../../PlansService'
import "./OwnPlansPage.css"
import { Link } from "react-router-dom";
import ChatIcon from "../../../icons/icons/charlas.png"

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
                    <img src="https://as01.epimg.net/tikitakas/imagenes/2017/08/16/portada/1502909050_145252_1502909120_noticia_normal.jpg" />
                  </div>
                </div>
                <div className="allPlanCardRight">
                  <div className="allPlanCardDate">{plan.date}<Link to={`/chat/${plan.chat}`}><img src={ChatIcon} /></Link></div>
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
        <div className="headerPlans">
          <h3 className="titlePlans">Mis planes</h3>
        </div>
        <div className="selectPlans">
          <p><Link to={"/ownplans"}>Creados</Link></p>
          <p><Link to={"/plansgo"}>Voy a ir</Link></p>
          <p><Link to={"/favourites"}>Guardados</Link></p>
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


