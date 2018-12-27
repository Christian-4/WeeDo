import React, { Component } from 'react'
import FavIcon from "../../icons/icons/save.png"
import SavedIcon from "../../icons/icons/saved.png"
import SearchIcon from "../../icons/icons/white.png"
import Location from "../../icons/icons/location.png"
import { Link } from "react-router-dom";
import './PlanCard.css'


const monthNames = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  
  

export default class PlanCard extends Component {

    constructor(props){
        super(props)

        this.state = {
            plan: this.props.plan,
            user: this.props.user
        }
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
    
    
      parserDate = (date) => {
        let newDate = new Date(date);
        return newDate;
      };
    
      showDay = (date) => {
        let newDate = new Date(date);
        return newDate.getUTCDate();
      }
    
      showMonth = (date) => {
        let newDate = new Date(date);
     
        return monthNames[newDate.getMonth()];
      }
    
      showYear = (date) => {
        let newDate = new Date(date);
        return newDate.getUTCDate();
      }
    
      showHour = (date) =>{
        let newDate = new Date(date);
        return newDate.getUTCHours();
      }
    
    
      showMins = (date) =>{
        let newDate = new Date(date);
        return newDate.getMinutes();
      }
    

  render() {
    return (
      <React.Fragment>
           <div className="allPlanCard">
              <div className="allPlanCardLeft">
                <div className="allPlanCardImagePlan">
                  <img src={this.state.plan.image} />
                </div>
                <div className="allPlanCardImageOwner">
                  <Link to={`/profile/${this.state.plan.owner._id}`}><img src={this.state.plan.owner.image} /></Link>
                </div>
              </div>
              {/* <div className="allPlanCardRight">
                {
                  this.state.user.favourites.includes(this.state.plan._id) ?
                    (<div className="allPlanCardDate">
                   
                    {this.showDay(this.state.plan.date)+" "}
                    {this.showMonth(this.state.plan.date)+","}
                    {this.showHour(this.state.plan.date)+":"}
                    {this.showMins(this.state.plan.date)}
                    <img onClick={() => this.delPlanFav(this.state.plan._id)} src={SavedIcon} /></div>)
                    :
                    (<div className="allPlanCardDate">
                   
                    {this.showDay(this.state.plan.date)+" "}
                    {this.showMonth(this.state.plan.date)+","}
                    {this.showHour(this.state.plan.date)+":"}
                    {this.showMins(this.state.plan.date)}

                     
                    <img onClick={() => this.addPlanFav(this.state.plan._id)} src={FavIcon} /></div>)
                }
                <div className="allPlanCardTitle"><Link to={`/plan/${this.state.plan._id}`}>{this.state.plan.title}</Link></div>
                <div className="allPlanCardUsers"><span className="textasist">Van a asistir </span><span>{this.state.plan.users.map(function (user, index) {
                  return (
                    <Link to={`/participants/${this.state.plan._id}`}><img src={this.state.user.image} /></Link>
                  )
                }.bind(this))}</span></div>
              </div> */}
            </div>
      </React.Fragment>
    )
  }
}
