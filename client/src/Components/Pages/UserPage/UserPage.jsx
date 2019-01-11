import React, { Component } from "react";
import FriendsService from "../../FriendsService";
import UserService from "../../UserService";
import { Link } from "react-router-dom"
import Nav from "../../Nav/Nav.jsx"
import "./UserPage.css"
import SearchIcon from "../../../icons/icons/search.png"
import SearchIconNav from "../../../icons/icons/white.png"
import FilterBars from "../../../icons/icons/filterBars.png"
import CineIcon from "../../../icons/icons/Cine.png"
import RugbyIcon from "../../../icons/icons/Rugby.png"
import BasketIcon from "../../../icons/icons/Baloncesto.png"
import FutbolIcon from "../../../icons/icons/Fútbol.png"


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

  addFriend = (id, service) => {
    service.addFriend(id).then(response => {
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
    });
  }

  showCardPendient = ({ user }) => {
    return (
      <React.Fragment>
        <div className="allUsersCard">
          <div className="allUsersCardTop">
            <Link to={`/profile/${user._id}`}><img src={user.image} width="50" height="50" /></Link>
            <Link to={`/profile/${user._id}`}><p>{user.username}</p></Link>
          </div>
          <div className="allUsersCardHobbies">
            <p>Intereses del usuario</p>
            <div className="allUsersCardHobbiesDivs">
              {user.hobbies.map(function (hobby) {
                return (
                  <div className="allUsersCardHobby">
                    <div className="hobbiesDivColor">
                      <img src={CineIcon} />
                      <img src={RugbyIcon} />
                      <img src={BasketIcon} />
                      <img src={FutbolIcon} />
                    </div>
                    <p>{hobby}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <button className="addFriendButton">Petición enviada</button>
          </div>
        </div>
      </React.Fragment>
    )
  }

  showCard = ({ user }, addFriend, service) => {
    return (
      <React.Fragment>
        <div className="allUsersCard">
          <div className="allUsersCardTop">
            <Link to={`/profile/${user._id}`}><img src={user.image} width="50" height="50" /></Link>
            <Link to={`/profile/${user._id}`}><p>{user.username}</p></Link>
          </div>
          <div className="allUsersCardHobbies">
            <p>Intereses del usuario</p>
            <div className="allUsersCardHobbiesDivs">
              {user.hobbies.map(function (hobby) {
                return (
                  <div>
                    <div className="allUsersCardHobby">
                      <div className="mask-hobby-allUsers">
                        <img className="image-hobby-allUsers" src={require(`../../../icons/icons/${hobby}.png`)}></img>
                      </div>
                    </div>
                    <p>{hobby}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <button className="addFriendButton" onClick={() => addFriend(user._id, service)}>
              Conectar
                </button>
          </div>
        </div>
      </React.Fragment>
    )
  }

  printAllUsers = (addFriend, service, userSession) => {
    return (
      <div className="allUsers">
        <img className="searchInput" src={SearchIcon} />
        <input className="inputFindUsers" type="text" placeholder="Busca algún amigo" onChange={(e) => this.searchHandler(e)}></input>
        {this.state.users.map(function (user) {
          return (
            <React.Fragment>
              {
                userSession[0].friends.includes(user._id) ?
                  ""
                  :
                  userSession[0].sendRequestUser.includes(user._id) ?
                    this.showCardPendient({ user })
                    :
                    this.showCard({ user }, addFriend, service)
              }
            </React.Fragment>

          );
        }.bind(this))}
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Nav title={"Encontrar conexiones"}
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
