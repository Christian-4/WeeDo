import React, { Component } from 'react'
import PlansService from '../../PlansService'
import UserService from '../../UserService'
import { Link, Redirect } from "react-router-dom";
import "./ParticipantsPage.css"
import Nav from "../../Nav/Nav"
import LeftIcon from "../../../icons/icons/leftcopy.png"
import CloseIcon from "../../../icons/icons/close.png"

export default class ParticipantsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            plan_id: this.props.match.params.id,
            plan: null,
            participants: null
        }

        this.plansService = new PlansService();
        this.userService = new UserService();
    }

    componentDidMount() {
        this.plansService.getPlan(this.state.plan_id)
            .then(response => {
                console.log(response)
                this.userService.getUser()
                    .then(res => {
                        console.log(res)
                        this.setState({ ...this.state, participants: response.plan.users, plan: response.plan, user: res.user })
                    })
            })
    }

    kickUser = (user, plan) => {
        this.plansService.kickUserOfPlan(user, plan)
            .then(response => {
                this.plansService.getPlan(this.state.plan_id)
                    .then(response => {
                        console.log(response)
                        this.setState({ ...this.state, participants: response.plan.users, plan: response.plan })
                    })
            })
    }


    printParticipants = (kickUser) => {
        let plan = this.state.plan
        let user = this.state.user
        return (
            <React.Fragment>
                {this.state.participants.map(function (participant, index) {
                    return (
                        <React.Fragment>
                            <div>
                                <div className="participantDiv">
                                    <div className="imageParticipantDiv">
                                        <Link to={`/profile/${participant._id}`}><img src={participant.image} /></Link>
                                    </div>
                                    <div className="nombreParticipantDiv">
                                        <Link to={`/profile/${participant._id}`}>{participant.username}</Link>
                                    </div>

                                    {plan.owner._id !== user._id ?
                                        <div className="expulsarParticipantDiv">

                                        </div>
                                        :
                                        plan.owner._id !== participant._id ?
                                            <div className="expulsarParticipantDiv">
                                                <img onClick={() => kickUser(participant._id, plan._id)} src={CloseIcon} />
                                            </div>
                                            :
                                            <div className="expulsarParticipantDiv">

                                            </div>
                                    }

                                </div>
                                <hr></hr>
                            </div>
                        </React.Fragment>
                    )
                })}
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Link to={"/plans"}><span className="participantsButtonBack"></span></Link>
                <Nav title={"Asistentes"}
                    iconleft={LeftIcon}
                    widthR={"20px"}
                    heigthR={"20px"}
                    widthL={"13px"}
                    heigthL={"10px"}
                />
                <div className="participantsDivs">
                    {
                        this.state.participants !== null &&
                        <div>{this.printParticipants(this.kickUser)}</div>
                    }
                </div>
            </React.Fragment>

        )
    }
}


