import React, { Component } from 'react'
import PlansService from '../../PlansService'
import { Link, Redirect } from "react-router-dom";
import "./ParticipantsPage.css"
import Nav from "../../Nav/Nav"
import LeftIcon from "../../../icons/icons/leftcopy.png"

export default class ParticipantsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            plan_id: this.props.match.params.id,
            plan: null,
            participants: null
        }

        this.plansService = new PlansService();
    }

    componentDidMount() {
        this.plansService.getPlan(this.state.plan_id)
            .then(response => {
                this.setState({ ...this.state, participants: response.plan.users })
            })
    }



    printParticipants = () => {
        return (
            <React.Fragment>
                {this.state.participants.map(function (participant, index) {
                    return (
                        <React.Fragment>
                            <div>
                                <Link to={`/profile/${participant._id}`}><div className="participantDiv">
                                    <div className="imageParticipantDiv"><img src={participant.image} /></div>
                                    <div className="nombreParticipantDiv">{participant.username}</div>
                                </div></Link>
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
                        <div>{this.printParticipants()}</div>
                    }
                </div>
            </React.Fragment>

        )
    }
}


