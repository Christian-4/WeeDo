import React, { Component } from 'react'
import PlansService from '../../PlansService'
import { Link } from "react-router-dom";
import Map from "../../Map/Map.jsx"


export default class PlanPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      plan_id: this.props.match.params.id,
      plan: null,
      notifications: null,
    }

    this.plansService = new PlansService();


  }


  componentDidMount() {
    this.plansService.getPlan(this.state.plan_id)
      .then(response => {
        this.plansService.getNotifications(this.state.plan_id)
          .then(responseNotifications => {
            console.log(responseNotifications)
            this.setState({ ...this.state, plan: response.plan, notifications: responseNotifications.confirmations })
          })
      })
  }

  handleDeletePlan = (e) => {
    e.preventDefault();

    const { plan_id } = this.state;

    this.plansService.deletePlan(plan_id)
      .then(response => {
        console.log("response " + response)
      });
  }

  acceptPlan = (id) => {
    this.plansService.acceptPlan(id)
      .then(response => {
        console.log(response)
      })
  }

  declinePlan = (id) => {
    this.plansService.declinePlan(id)
      .then(response => {
        console.log(response)
      })
  }

  planRequest = (id) => {
    this.plansService.planRequest(id)
      .then(response => {
        console.log(response)
      })
  }

  addPlanFav = (id) => {
    this.plansService.addPlanFav(id)
      .then(response => {
        console.log(response)
      })
  }

  delPlanFav = (id) => {
    this.plansService.delPlanFav(id)
      .then(response => {
        console.log(response)
      })
  }

  printPlan = (planRequest, addPlanFav, delPlanFav) => {
    const { title, description, date, chat } = this.state.plan
    return (
      <React.Fragment>
        <div>
          <p>{title}</p>
          <p>{description}</p>
          <p>{date}</p>
          <button onClick={() => planRequest(this.state.plan_id)}>Join request</button>
          <button onClick={() => addPlanFav(this.state.plan_id)}>Add to Favourites</button>
          <button onClick={() => delPlanFav(this.state.plan_id)}>Del from Favourites</button>
          {/* <Link to={`/chat/${chat}`}><p> Chat</p></Link> */}
        </div>
      </React.Fragment>
    )
  }

  printMap = () => {
    console.log(this.state.plan)
    return (
      <React.Fragment>

        <Map center={this.state.plan.location} view={true} />
      </React.Fragment>
    )
  }

  printNotifications = (acceptPlan, declinePlan) => {
    return (
      <React.Fragment>
        {this.state.notifications.map(function (notification, index) {
          return (
            <div>
              <div>{notification.plan.title}</div>
              <div>{notification.user.username}</div>
              <div><img src={notification.user.image} /></div>
              <div>
                <button onClick={() => acceptPlan(notification._id)}>✓</button>
                <button onClick={() => declinePlan(notification._id)}>X</button>
              </div>
              <Link to={`/profile/${notification.user._id}`}><p>View profile</p></Link>
            </div>
          )
        })}
      </React.Fragment>
    )
  }

  render() {
    return (

      <div>
        {
          this.state.plan !== null &&
          <div>
            {this.printPlan(this.planRequest, this.addPlanFav, this.delPlanFav)}
            <form onSubmit={this.handleDeletePlan} className="new-plan-form">
              <input type="submit" value="delete-plan" />
            </form>
          </div>

        }

        {
          this.state.notifications !== null &&
          <div>{this.printNotifications(this.acceptPlan, this.declinePlan)}</div>

        }

        {this.state.plan !== null &&

          <div> {this.printMap()} </div>
        }

      </div>
    )
  }
}
