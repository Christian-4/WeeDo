import React, { Component } from "react";
import UserService from '../../UserService';
import FormSinUp from '../../FormSingUp/FormSingUp.jsx';
import { Link } from "react-router-dom";
import Logout from "../../Logout/Logout.jsx"


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
      <div>
        <FormSinUp profile={true}/>
        <div>
        <Logout></Logout>
      </div>

      </div>
     
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
