import React, { Component } from 'react'
import Nav from "../../Nav/Nav.jsx"
import Left from "../../../icons/icons/left.png"
import UserService from "../../UserService"
import PlanService from "../../PlansService"

import "./SendPlanPage.css"

export default class SendPlanPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listUsers: [],
      usersSelected: [],
      selected: false,
      buttonText: "Seleccionar",
      planId: this.props.match.params.id
    }

    this.UserService = new UserService()
    this.PlanService = new PlanService()
  }

  componentDidMount() {
    this.UserService.getUser()
      .then(response => {
        this.PlanService.getPlan(this.state.planId)
        this.setState({ ...this.state, listUsers: response.user.friends })
      })
  }

  selectFriendClicked = (e) => {

    if (this.state.selected) {
      e.target.className = "no-selected-button"
      let index = this.state.usersSelected.indexOf(e.target.name)
      let newArray = this.state.usersSelected.splice(index, 1)
      this.setState({ ...this.state, usersSelected: newArray })
    } else {
      e.target.className = "selected-button"
      let newArray = this.state.usersSelected.push(e.target.name)
      this.setState({ ...this.state, usersSelected: newArray })
    }


    this.setState({ ...this.state, selected: true })
  }

   
  sendPlanToUser = (e) => {

    let promises=[]

    e.target.className = "send-plan-button-clicked"
    this.state.usersSelected.forEach(user => {
      let planId = this.state.planId
      promises.push( this.UserService.sendPlanToUser({user,planId}))
    })

    Promise.all(promises).then({})
    
  }


  render() {
    return (

      <React.Fragment>
        <Nav
          title={"Enviarle el plan a"}
          iconleft={Left}
          widthL={"9px"}
          heightL={"15px"}
        />

        <div>
          {this.state.listUsers.map(user => {
            return (
              <div className="user-container">
                <img className="user-image" src={user.image}></img>
                <p className="user-name">{user.name}</p>
                <button className="no-selected-button" name={user._id} onClick={e => this.selectFriendClicked(e)}></button>
              </div>

            )
          })}
        </div>
        <div className="button-send-div">
          {this.state.selected
            ?
            <button className="send-plan-button" onClick={e=>this.sendPlanToUser(e)}></button>
            :
            ""
          }
        </div>

      </React.Fragment>

    )
  }
}
