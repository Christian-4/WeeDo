import React, { Component } from 'react'
import PlansService from '../../PlansService'
import { Link, Redirect } from "react-router-dom";
import "./NotificationsPlanPage.css"
import Nav from "../../Nav/Nav"
import Accept from "../../../icons/icons/ConexionAdd.png"
import Decline from "../../../icons/icons/ConexionDecline.png"
import LeftIcon from "../../../icons/icons/leftcopy.png"


export default class NotificationsPlanPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plan_id: this.props.match.params.id,
            plan: null,
            notifications: null
        }

        this.plansService = new PlansService();
    }

    componentDidMount() {
        this.plansService.getPlan(this.state.plan_id)
            .then(response => {
                this.plansService.getNotifications(this.state.plan_id)
                    .then(responseNotifications => {
                        console.log(responseNotifications)
                        console.log(response)
                        this.setState({ ...this.state, plan: response.plan, notifications: responseNotifications.confirmations })
                    })
            })
    }

    acceptPlan = (id) => {
        this.plansService.acceptPlan(id)
            .then(response => {
                console.log(response)
                this.plansService.getNotifications(this.state.plan_id)
                    .then(responseNotifications => {
                        console.log(responseNotifications)
                        console.log(response)
                        this.setState({ ...this.state, notifications: responseNotifications.confirmations })
                    })
            })
    }

    declinePlan = (id) => {
        this.plansService.declinePlan(id)
            .then(response => {
                console.log(response)
                this.plansService.getNotifications(this.state.plan_id)
                    .then(responseNotifications => {
                        console.log(responseNotifications)
                        console.log(response)
                        this.setState({ ...this.state, notifications: responseNotifications.confirmations })
                    })
            })
    }

    printNotifications = (acceptPlan, declinePlan) => {
        return (
            <React.Fragment>
                <Link to={`/chat/${this.state.plan.chat}`}><span className="buttonBackNotifications"></span></Link>
                {this.state.notifications.map(function (notification, index) {
                    return (
                        <React.Fragment>
                        <div className="notificationDiv">
                            <div className="imageNotificationDiv"><Link to={`/profile/${notification.user._id}`}><img src={notification.user.image} /></Link></div>
                            <div className="nombreNotificationDiv">{notification.user.username}</div>
                            <div className="buttonsNotificationDiv">
                                <img src={Decline} onClick={() => declinePlan(notification._id)}/>
                                <img src={Accept} onClick={() => acceptPlan(notification._id)}/>
                            </div>
                        </div>
                        <hr/>
                        </React.Fragment>
                    )
                })}
            </React.Fragment>
        )
    }

    render() {

        return (
            <React.Fragment>
                <Nav title={"Quieren añadirse"}
                    iconleft={LeftIcon}
                    widthR={"20px"}
                    heigthR={"20px"}
                    widthL={"13px"}
                    heigthL={"10px"}
                />
                <div className="notificationsDivs">
                    {
                        this.state.notifications !== null &&
                        <div>{this.printNotifications(this.acceptPlan, this.declinePlan)}</div>
                    }
                </div>
            </React.Fragment>

        )
    }
}

