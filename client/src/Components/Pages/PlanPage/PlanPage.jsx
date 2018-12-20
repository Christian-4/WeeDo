import React, { Component } from "react";
import PlansService from "../../PlansService";
import { Link, Redirect, Route } from "react-router-dom";

import Map from "../../Map/Map.jsx";
import "./PlanPage.css";
import group5 from "../../../icons/icons/Group5.png";
import group4 from "../../../icons/icons/Group4.png";
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
      plan_id: this.props.match.params.id,
      plan: null,
      notifications: null,
      redirectWhenDelete: false,
      showthemap: false
    };

    this.plansService = new PlansService();
  }

  componentDidMount() {
    this.plansService.getPlan(this.state.plan_id).then(response => {
      console.log(response);
      this.setState({ ...this.state, plan: response.plan });
    });
  }

  // handleDeletePlan = (e) => {
  //   e.preventDefault();
  //   console.log("holaaa delete")
  //   const { plan_id } = this.state;

  //   this.plansService.deletePlan(plan_id)
  //     .then(response => {
  //       console.log("planesborrados", response.message)
  //       if (response.message === "Plan deleted!") {
  //         this.setState({ ...this.state, redirectWhenDelete: true })
  //       }
  //     });
  // }

  parserDate = () => {
    let newDate = new Date(this.state.plan.date);
    return newDate;
  };

  planRequest = id => {
    this.plansService.planRequest(id).then(response => {
      console.log(response);
    });
  };

  addPlanFav = id => {
    this.plansService.addPlanFav(id).then(response => {
      console.log(response);
    });
  };

  delPlanFav = id => {
    this.plansService.delPlanFav(id).then(response => {
      console.log(response);
    });
  };

  showMap = () => {};

  printPlan = (planRequest, addPlanFav, delPlanFav) => {
    const { title, description, date, chat } = this.state.plan;
    const users = this.state.plan.users.length;
    return (
      <React.Fragment>
        <div className="planImage">
          <img src="https://as01.epimg.net/tikitakas/imagenes/2017/08/16/portada/1502909050_145252_1502909120_noticia_normal.jpg" />
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
              <div className="plan-hour">
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
            <Link to={`/participants/${this.state.plan._id}`}>
              <span>
                {this.state.plan.users.map(function(user, index) {
                  return <img src={user.image} />;
                })}
              </span>
            </Link>
          </div>
          <img src={RightIcon} className="right-icon"></img>
          <div className="buttonsPlan">
            <button
              className="buttonApuntarme"
              onClick={() => planRequest(this.state.plan_id)}
            >
              ¡Quiero apuntarme!
            </button>
            <Link to={`/chat/${chat}`}>
              <img src={group5} />
            </Link>
            <img src={group4} onClick={() => addPlanFav(this.state.plan_id)} />
            {/* <button onClick={() => delPlanFav(this.state.plan_id)}>Del from Favourites</button> */}
            {/* <form onSubmit={this.handleDeletePlan} className="new-plan-form">
              <input type="submit" value="delete-plan" />
            </form> */}
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
        {this.state.notifications.map(function(notification, index) {
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

        {/* {this.state.plan !== null && this.state.showthemap &&

          <div> {this.printMap()} </div>
        } */}
      </div>
    );
  }
}
