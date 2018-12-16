import React, { Component } from "react";
import FriendService from '../../FriendsService'
// import PlanService from '../../PlansService'
import { Link } from "react-router-dom";

export default class NotificationsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notificationsFriends: null
            // notificationsPlans: null,
        };

        this.friendService = new FriendService()
        // this.planService = new PlanService()
    }

    componentDidMount() {
        this.friendService.getNotifications()
            .then(responsefriend => {
                console.log(responsefriend)
                this.setState({ ...this.state, notificationsFriends: responsefriend.confirmations })
                // this.planService.getNotifications()
                //     .then(responseplan => {
                //         console.log(responseplan.confirmations)
                //         this.setState({ ...this.state, notificationsPlans: responseplan.confirmations })
                //     })
            })
    }

    // acceptPlan = (id) => {
    //     this.planService.acceptPlan(id)
    //         .then(response => {
    //             console.log(response)
    //         })
    // }

    // declinePlan = (id) => {
    //     this.planService.declinePlan(id)
    //         .then(response => {
    //             console.log(response)
    //         })
    // }

    acceptFriend = (id) => {
        this.friendService.acceptFriend(id)
            .then(response => {
                console.log(response)
            })
    }

    declineFriend = (id) => {
        this.friendService.declineFriend(id)
            .then(response => {
                console.log(response)
            })
    }

    printFriendNotifications = (acceptFriend, declineFriend) => {
        return (
            <React.Fragment>
                {this.state.notificationsFriends.map(function (notification, index) {
                    return (
                        <div>
                            <div>{notification.originUser.username}</div>
                            <div><img src={notification.originUser.image} /></div>
                            <div>
                                <button onClick={() => acceptFriend(notification._id)}>✓</button>
                                <button onClick={() => declineFriend(notification._id)}>X</button>
                            </div>
                            <Link to={`/profile/${notification.originUser._id}`}><p>View profile</p></Link>
                        </div>
                    )
                })}


            </React.Fragment>
        )
    }

    // printPlantNotifications = (acceptPlan, declinePlan) =>{
    //     return (
    //         <React.Fragment>
    //              {this.state.notificationsPlans.map(function (notification, index) {
    //                 return (
    //                     <div>
    //                         <div>{notification[0].plan.title}</div>
    //                         <div>{notification[0].user.username}</div>
    //                         <div><img src={notification[0].user.image} /></div>
    //                         <div>
    //                             <button onClick={() => acceptPlan(notification[0]._id)}>✓</button>
    //                             <button onClick={() => declinePlan(notification[0]._id)}>X</button>
    //                         </div>
    //                         <Link to={`/profile/${notification[0].user._id}`}><p>View profile</p></Link>
    //                     </div>
    //                 )
    //             })}
    //         </React.Fragment>
    //     )
    // }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.notificationsFriends !== null &&
                    <div>{this.printFriendNotifications(this.acceptFriend, this.declineFriend)}</div>

                }
            </React.Fragment>
        )
    }
}

