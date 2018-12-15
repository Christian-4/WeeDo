import React, { Component } from "react";
import UserService from '../../UserService';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      userId: "5c14cdd2005e2203040cf7ff"
    }

    this.UserService = new UserService()
  }

  componentDidMount() {

    this.UserService.getProfile(this.state.userId)
    .then(response => {
        this.setState({...this.state, user: response.user})
    })
  }

  printUser = () =>{
    return (
      <div>
       <img src = {this.state.user.image} width="250" height="200"/>
       <div> {this.state.user.username} </div>
       <div> {this.state.user.email} </div>
       <div> {this.state.user.username} </div>
       <div> {this.state.user.hobbies.map(function(hobbie,index){
        return  <div>  {hobbie} </div>
       })}</div>
       <lable>Biografía: </lable>
       <textarea></textarea>
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
