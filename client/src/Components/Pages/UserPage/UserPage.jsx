import React, { Component } from "react";
import FriendsService from "../../FriendsService";

export default class UserPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
        users : null
    }
    
    this.FriendsService = new FriendsService()
  }

  componentDidMount(){
    this.FriendsService.getAllUsers()
    .then(response =>{
       this.setState({...this.state, users: response.users})
    })
  }

  addFriend(id, service) {
     
    service.addFriend(id)
    .then(response => {
        console.log(response);
    })
  }


  printAllUsers = (addFriend, service) => {

      return (
          <div>
              {this.state.users.map(function(user){
                  return(
                    <div>
                        <img src={user.image} width="50" height="50"></img>
                        <p>{user.username}</p>
                        <button onClick = {() => addFriend(user._id, service)}>Add Friend</button>
                    </div>
                  )
              })}
          </div>
      )
  }



  render() {
    return (
        <React.Fragment>
            
            {
                this.state.users !== null &&
                <div>{this.printAllUsers(this.addFriend, this.FriendsService)}</div>
            }
        </React.Fragment>
    )
  }
}
