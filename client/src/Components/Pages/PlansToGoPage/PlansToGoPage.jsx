import React, { Component } from 'react'
import PlanService from '../../PlansService'
import "./PlansToGoPage.css"
import { Link } from "react-router-dom";


export default class PlansToGoPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            plans: null
        }

        this.planService = new PlanService()
    }


    componentDidMount() {
        this.planService.getPlansToGo()
            .then(response => {
                console.log(response)
                this.setState({ ...this.state, plans: response.planstogo })
            })
    }



    printPlans = () => {
        return (
            <React.Fragment>
        {this.state.plans.map(function (plan, index) {
          return (
            <div className="planDiv">
              <div className="planCard">
                <div className="topPlanCard">
                  <div className="imagePlan">
                    <img src="https://as01.epimg.net/tikitakas/imagenes/2017/08/16/portada/1502909050_145252_1502909120_noticia_normal.jpg" />
                  </div>
                  <div className="fechaHoraDiv">
                    <p className="fechaYHoraPlan">{plan.date}</p>
                    <Link to={`/plan/${plan._id}`}><p className="nombrePlan">{plan.title}</p></Link>
                  </div>
                  <div>
                    <Link to={`/chat/${plan.chat}`}>Chat icon</Link>
                  </div>
                </div>
                <div className="botPlanCard">
                <p className="assistantsPlan">Van a asistir:</p><span>{plan.users.map(function (user, index) {
                    return (
                      <Link to={`/profile/${user._id}`}><img src={user.image} /></Link>
                    )
                  })}</span>
                </div>
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
        {
          this.state.plans !== null &&
          <div>
            {this.printPlans()}
          </div>
        }
      </React.Fragment>
        )
    }
}


