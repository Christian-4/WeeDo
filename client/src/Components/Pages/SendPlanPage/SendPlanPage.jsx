import React, { Component } from 'react'
import Nav from "../../Nav/Nav.jsx"
import Left from "../../../icons/icons/left.png"
import UserService from "../../UserService"

export default class SendPlanPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        listUsers : []
    }

    this.UserService = new UserService()
  }

  componentDidMount() {
    this.UserService.getUser()
      .then(user => {
          this.setState({...this.state, listUsers: user.friends})
      })

  }
  render() {
    return (
      <div>
        <React.Fragment>
          <p>hola</p>
          <Nav
          
            title={"Enviarle el plan a"}
            iconleft={Left}
            widthL={"9px"}
            heightL={"15px"}

          />
        </React.Fragment>
      </div>
    )
  }
}
