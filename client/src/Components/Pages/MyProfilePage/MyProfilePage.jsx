import React, { Component } from "react";
import UserService from '../../UserService';
import FormSinUp from '../../FormSingUp/FormSingUp.jsx';
import { Link } from "react-router-dom";
import Logout from "../../Logout/Logout.jsx"
import Nav from "../../Nav/Nav"

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    }

    this.UserService = new UserService()
  }

  componentDidMount() {

    this.UserService.getUser()
    .then(response => {
        this.setState({...this.state, user: response.user})
    })
  }

  printUser = () =>{
    return (
      <React.Fragment>
        <Nav/>
        <section className="personal-data">
          <div className="div-photo">
           <img className="user-photo" src={this.state.user.image}></img>
          </div>
          {this.state.user.username}
        </section>
        <div>
        <Logout></Logout>
      </div>

      </React.Fragment>
     
    )
  }

  render() {
    return( 
      <React.Fragment>
        {
          this.state.user !== null && 
          <div>{this.printUser()}</div>
       
        }
       
        
      </React.Fragment>
    )
  }
}
