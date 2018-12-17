import React, { Component } from "react";
import FriendService from '../../FriendsService'
import { Link } from "react-router-dom";


export default class FriendsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: null
    };

    this.friendService = new FriendService()
  }

  componentDidMount() {
    this.friendService.getFriends()
      .then(response => {
        console.log(response.friends)
        this.setState({ ...this.state, friends: response.friends })
      })
  }

  deleteFriend = (id) => {
    this.friendService.deleteFriend(id)
      .then(response => {
        console.log(response.friends)
        this.setState({ ...this.state, friends: response.friends })
      })
  }

  printFriends = (deleteFriend) => {
    return (
      <React.Fragment>
        {this.state.friends.map(function (friend, index) {
          return (
            <div>
              <div>{friend.username}</div>
              <img src={friend.image} />
              <p>{friend.hobbies}</p>
              <p>{friend.location}</p>
              <button onClick={() => deleteFriend(friend._id)}>Delete friend</button>
              <Link to={`/profile/${friend._id}`}><p>View friend</p></Link>
            </div>
          )
        })}
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.friends !== null &&
          <div>{this.printFriends(this.deleteFriend)}</div>

        }
      </React.Fragment>
    )
  }
}
