import React, { Component } from "react";
import FriendService from '../../FriendsService'
import ChatService from '../../ChatService'
import { Link } from "react-router-dom";
import Nav from "../../Nav/Nav.jsx"
import Tapbar from "../../Tapbar/Tapbar.jsx"
import "./FriendsPage.css"
import Accept from "../../../icons/icons/ConexionAdd.png"
import Decline from "../../../icons/icons/ConexionDecline.png"
import SearchIcon from "../../../icons/icons/white.png"
import FilterBars from "../../../icons/icons/filterBars.png"


export default class FriendsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      friendchats: null,
      notificationsFriends: null
    };

    this.friendService = new FriendService()
    this.chatService = new ChatService()
  }

  componentDidMount() {
    this.friendService.getNotifications()
      .then(responsefriend => {
        console.log(responsefriend)
        this.chatService.getChats()
          .then(response => {
            console.log(response)
            this.setState({ ...this.state, notificationsFriends: responsefriend.confirmations, friendchats: response.friendchats, user: response.user })
          })
      })
  }

  acceptFriend = (id) => {
    this.friendService.acceptFriend(id)
      .then(response => {
        console.log(response)
        this.friendService.getNotifications()
          .then(responsefriend => {
            console.log(responsefriend)
            this.chatService.getChats()
              .then(response => {
                console.log(response)
                this.setState({ ...this.state, notificationsFriends: responsefriend.confirmations, friendchats: response.friendchats })
              })
          })
      })
  }

  declineFriend = (id) => {
    this.friendService.declineFriend(id)
      .then(response => {
        console.log(response)
        this.friendService.getNotifications()
          .then(responsefriend => {
            console.log(responsefriend)
            this.chatService.getChats()
              .then(response => {
                console.log(response)
                this.setState({ ...this.state, notificationsFriends: responsefriend.confirmations, friendchats: response.friendchats })
              })
          })
      })
  }

  printFriendNotifications = (acceptFriend, declineFriend) => {
    return (
      <React.Fragment>
        <div className="findNewConections">
          <Link to={`/allusers`}><button>Encontrar nuevas conexiones</button></Link>
        </div>
        <p className="notificationsTitle">Quieren añadirte a sus conexiones</p>
        <div className="notificationsConections">
          <div className="notificationsConectionsPeople">
            {this.state.notificationsFriends.map(function (notification, index) {
              return (
                <React.Fragment>
                  <div className="notificationConectionsPerson">
                    <Link to={`/profile/${notification.originUser._id}`}><img src={notification.originUser.image} /></Link>
                    <span>{notification.originUser.username}</span>
                    <div className="notificationConectionsPersonButtons">
                      <img src={Accept} onClick={() => acceptFriend(notification._id)} />
                      <img src={Decline} onClick={() => declineFriend(notification._id)} />
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </React.Fragment>
    )
  }

  printChats = () => {
    let actualUser = this.state.user
    let otherUser
    return (
      <React.Fragment>
        <div className="chatsConections">
          <p>Tus conexiones</p>
          {this.state.friendchats.map(function (chat, index) {
            chat.users.map(function (user) {
              if (actualUser._id !== user._id) {
                otherUser = user
              }
            })
            return (
              <React.Fragment>
                <Link to={`/chat/${chat._id}`}><div className="chatConections">
                  <div className="chatConectionsImage"><img src={otherUser.image} /></div>
                  <div className="chatConectionsName">{otherUser.username}</div>
                </div>
                </Link>
                <hr />
              </React.Fragment>
            )
          })}
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
         <Nav  title={"Encontrar conexiones"} 
        iconleft={SearchIcon} 
        iconright={FilterBars} 
        widthR={"20px"} 
        heigthR={"20px"} 
        widthL={"20px"} 
        heigthL={"20px"}
        />
        <div className="conectionsPage">
          {
            this.state.notificationsFriends !== null &&
            <div>{this.printFriendNotifications(this.acceptFriend, this.declineFriend)}</div>
          }
          {
            this.state.friendchats !== null &&
            <div>{this.printChats()}</div>
          }
        </div>
        <Tapbar></Tapbar>
      </React.Fragment>
    )
  }
}