import React, { Component } from "react";
import PlansService from "../../PlansService";
import UserService from "../../UserService";
import { Link, Redirect, Route } from "react-router-dom";

import Map from "../../Map/Map.jsx";
import "./PlanPage.css";
import group5 from "../../../icons/icons/Group5.png";
import group4 from "../../../icons/icons/Group4.png";
import savedd from "../../../icons/icons/savedd.png";
import locationIcon from "../../../icons/icons/location.png";
import RightIcon from "../../../icons/icons/right.png"


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

  

export default class PlanPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      plan_id: this.props.match.params.id,
      plan: null,
      notifications: null,
      redirectWhenDelete: false,
      showthemap: false,
      class: "buttonsPlan",
      text: "¡Quiero apuntarme!",
      showButton: true

    };

    this.plansService = new PlansService();
    this.userService = new UserService();
  }

  componentDidMount() {
    this.plansService.getPlan(this.state.plan_id).then(response => {
      this.userService.getUser()
        .then(res => {
          this.setState({ ...this.state, plan: response.plan, user: res.user });
          this.isJoined()
          this.showText()
        })
    });
  }


  parserDate = () => {
    let newDate = new Date(this.state.plan.date);
    return newDate;
  };

  planRequest = id => {
    this.plansService.planRequest(id).then(response => {
      this.plansService.getPlan(this.state.plan_id).then(response => {

        this.userService.getUser()
          .then(res => {
            this.setState({ ...this.state, plan: response.plan, user: res.user, text: "Petición enviada!" });
           
          })
      });
    });
  
  };

  addPlanFav = id => {
    this.plansService.addPlanFav(id).then(response => {
      this.plansService.getPlan(this.state.plan_id).then(response => {

        this.userService.getUser()
          .then(res => {
            this.setState({ ...this.state, plan: response.plan, user: res.user });
          })
      });
    });
  };

  delPlanFav = id => {
    this.plansService.delPlanFav(id).then(response => {
      this.plansService.getPlan(this.state.plan_id).then(response => {

        this.userService.getUser()
          .then(res => {
            this.setState({ ...this.state, plan: response.plan, user: res.user });
          })
      });
    });
  };

  isJoined = () => {

    var usersJoinded =  this.state.plan.users.filter(function(user){
          return user._id === this.state.user._id
      }.bind(this))

      if(usersJoinded.length === 0){
    
        this.setState({...this.state,className:"buttonsPlan buttons-flex", showButton:false})
      
      }
   };

   showText = () =>{

      if(!this.state.plan.confirmations.length === 0 || !this.state.plan.confirmations.length === undefined){
        var requestSend = this.state.plan.confirmations.filter(function(confirmation){
          console.log(confirmation._id, )
          return confirmation.user._id === this.state.user._id
        }.bind(this))
  
        if(!requestSend.length === 0 ){
          this.setState({...this.state, text: "¡Quiero apuntarme!"})
          
        }else{
          this.setState({...this.state, text:  "Petición enviada"})
        
        }
      }
      
   }

  printPlan = (planRequest, addPlanFav, delPlanFav) => {
    const { title, description, date, chat } = this.state.plan;
    const users = this.state.plan.users.length;
    const user = this.state.plan.user
    return (
      <React.Fragment>
        <div className="planImage">
          <img src= {this.state.plan.image} />
          <Link to={`/profile/${this.state.plan.owner._id}`}>
            <img className="planImageOwner" src={this.state.plan.owner.image} />
          </Link>
        </div>
        <div className="informationPlan">
          <div className="headerPlan">
            <div className="datePlan">
              <div className="month">
                {monthNames[this.parserDate().getMonth()]}
              </div>

              <div className="day">
                {this.parserDate().getUTCDate()}
              </div>
              <div className="plan-hour-plan">
                {this.parserDate().getUTCHours() +
                  ":" +
                  this.parserDate().getMinutes()}
              </div>
            </div>
            <div className="titlePlan">{title}</div>
          </div>
          <div className="locationPlan">
            <Link to={`/planmap/${this.state.plan_id}`} plan={this.state.plan}>
              {" "}
              <img src={locationIcon} />{" "}
            </Link>
            {this.state.plan.location.place}
          </div>
          <div className="descriptionPlan">
            <p className="descriptionPlan2">Descripción del plan</p>
            <p className="descriptionPlan3">{description}</p>
          </div>
          <div className="usersPlan">
            <p>{users} personas van a acudir</p>
            <span>
              {this.state.plan.users.map(function (user, index) {
                return <img src={user.image} />;
              })}
            </span>

          </div>
          <div>
            <Link to={`/participants/${this.state.plan._id}`}>
              <img src={RightIcon} className="right-icon"></img>
            </Link>
          </div>

          <div className={this.state.class}>
              {!this.state.showButton
               ?
                  <button className="buttonApuntarme" onClick={() => planRequest(this.state.plan_id)}>
                  {this.state.text}
                  </button>
                
              :
                ""
              }
            
            
           
            <Link to={`/sendPlanPage/${this.state.plan_id}`}>
              <img src={group5} />
            </Link>
            {
              this.state.user.favourites.includes(this.state.plan._id) ?
                (<img src={savedd} onClick={() => delPlanFav(this.state.plan_id)} />)
                :
                (<img src={group4} onClick={() => addPlanFav(this.state.plan_id)} />)
            }
           
          </div>
        </div>
      </React.Fragment>
    );
  };

  printMap = () => {
    console.log(this.state.plan);
    return (
      <React.Fragment>
        <Map center={this.state.plan.location} view={false} />
      </React.Fragment>
    );
  };

  printNotifications = (acceptPlan, declinePlan) => {
    return (
      <React.Fragment>
        {this.state.notifications.map(function (notification, index) {
          return (
            <div>
              <div>{notification.plan.title}</div>
              <div>{notification.user.username}</div>
              <div>
                <img src={notification.user.image} />
              </div>
              <div>
                <button onClick={() => acceptPlan(notification._id)}>✓</button>
                <button onClick={() => declinePlan(notification._id)}>X</button>
              </div>
              <Link to={`/profile/${notification.user._id}`}>
                <p>View profile</p>
              </Link>
            </div>
          );
        })}
      </React.Fragment>
    );
  };

  render() {
    if (this.state.redirectWhenDelete) {
      return <Redirect to={"/ownplans"} />;
    }

    return (
      <div>
        {this.state.plan !== null && (
          <div>
            {this.printPlan(this.planRequest, this.addPlanFav, this.delPlanFav)}
            <br />
            <br />
            <br />
          </div>
        )}      
      </div>
    );
  }
}
