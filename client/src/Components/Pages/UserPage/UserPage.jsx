import React, { Component } from "react";
import FriendsService from "../../FriendsService";
import UserService from "../../UserService";
import { Link } from "react-router-dom"
import Nav from "../../Nav/Nav.jsx"
import "./UserPage.css"
import SearchIcon from "../../../icons/icons/search.png"
import SearchIconNav from "../../../icons/icons/white.png"
import FilterBars from "../../../icons/icons/filterBars.png"


export default class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      usersreset: null,
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
            usersreset: response.users,
            userSession: response.userSession
          });
        }
      );
    });
  }

  searchHandler = (e) => {
    this.state.users = this.state.usersreset
    let newArray = [...this.state.users].filter((user) => {
      if (user.username.includes(e.target.value)) {
        return user
      }
    });
    this.setState({ users: newArray })
  }

  addFriend(id, service) {
    service.addFriend(id).then(response => {
      console.log(response);
    });
  }

  printAllUsers = (addFriend, service, userSession) => {
    return (
      <div className="allUsers">
        <img className="searchInput" src={SearchIcon} />
        <input className="inputFindUsers" type="text" placeholder="Busca algún amigo" onChange={(e) => this.searchHandler(e)}></input>
        {this.state.users.map(function (user) {
          return (
            <div className="allUsersCard">
              <div className="allUsersCardTop">
                <Link to={`/profile/${user._id}`}><img src={user.image} width="50" height="50" /></Link>
                <Link to={`/profile/${user._id}`}><p>{user.username}</p></Link>
              </div>
              <div className="allUsersCardHobbies">
                <p>Intereses del usuario</p>
                <div className="allUsersCardHobbiesDivs">
                  {user.hobbies.map(function (hobby) {
                    console.log(hobby)
                    return (
                      <div className="allUsersCardHobby">
                        <img src="" />
                        <p>{hobby}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                {
                  userSession[0].friends.includes(user._id) ?
                    <button className="addFriendButton">Ya es amigo!</button>
                    :
                    userSession[0].sendRequestUser.includes(user._id) ? (
                      <button className="addFriendButton">Petición enviada</button>
                    ) : (
                        <button className="addFriendButton" onClick={() => addFriend(user._id, service)}>
                          Conectar
                </button>
                      )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Nav title={"Encontrar conexiones"}
          iconleft={SearchIconNav}
          iconright={FilterBars}
          widthR={"20px"}
          heigthR={"20px"}
          widthL={"20px"}
          heigthL={"20px"}
        />
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
