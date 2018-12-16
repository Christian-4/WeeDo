import React, { Component } from 'react'
import ChatService from '../../ChatService'
import { Link } from "react-router-dom";

export default class ChatsPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: null,
      friendchats: null,
      planchats: null
    }

    this.chatService = new ChatService()
  }


  componentDidMount() {
    this.chatService.getChats()
      .then(response => {
        console.log(response)
        this.setState({ ...this.state, friendchats: response.friendchats, planchats: response.planchats, user: response.user })
      })
  }



  printChats = () => {
    let actualUser = this.state.user
    let otherUser
    return (
      <React.Fragment>
        {this.state.friendchats.map(function (chat, index) {
          chat.users.map(function (user) {
            if (actualUser._id !== user._id){
              otherUser = user.username
            }
          })
          return (
            <div>
              <div>{otherUser}</div>
              <Link to={`/chat/${chat._id}`}><p>Enter in chat</p></Link>
            </div>

          )
        })}

        {this.state.planchats.map(function (chat, index) {
          return (
            <div>
              <div>Plan: {chat.plan.title}</div>
              <Link to={`/chat/${chat._id}`}><p>Enter in chat</p></Link>
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
          this.state.friendchats !== null && this.state.planchats !== null &&
          <div>{this.printChats()}</div>

        }


      </React.Fragment>
    )
  }
}
