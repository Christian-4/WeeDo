import React, { Component } from "react";
import FriendsService from "../../FriendsService";
import UserService from "../../UserService";

export default class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      userSession: null,
      userSessionId: null
    };

    this.FriendsService = new FriendsService();
    this.UserService = new UserService();
  }

  componentDidMount() {
    this.UserService.getUser().then(res => {
      this.setState({ ...this.state, userSessionId: res.user._id });
      this.FriendsService.getAllUsers(this.state.userSessionId).then(
        response => {
          this.setState({
            ...this.state,
            users: response.users,
            userSession: response.userSession
          });
        }
      );
    });
  }

  addFriend(id, service) {
    service.addFriend(id).then(response => {
      console.log(response);
    });
  }

  printAllUsers = (addFriend, service, userSession) => {
    return (
      <div>
        {this.state.users.map(function(user) {
          return (
            <div>
              <img src={user.image} width="50" height="50" />
              <p>{user.username}</p>
              {userSession[0].sendRequestUser.includes(user._id) ? (
                <p>Request send</p>
              ) : (
                <button onClick={() => addFriend(user._id, service)}>
                  Add Friend
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.state.users !== null && (
          <div>
            {this.printAllUsers(
              this.addFriend,
              this.FriendsService,
              this.state.userSession
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}
