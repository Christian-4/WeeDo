import React, { Component } from "react";
import ChatInput from "../../ChatInput/ChatInput.jsx";
import ChatMessage from "../../ChatMessage/ChatMessage.jsx";
import ChatService from "../../ChatService";
import ChatManager from "../../../chat/chatManager";
import Nav from "../../Nav/Nav.jsx";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import "../ChatPage/ChatPage.css";
import Notifications from "../../../icons/icons/notifications.png"
import Left from "../../../icons/icons/left.png"
import Calendar from "../../../icons/icons/calendarcopy.png"
import LocationIcon from "../../../icons/icons/location.png"
import ClockIcon from "../../../icons/icons/hour.png"



export default class IndividualChat extends Component {
  constructor(props) {
    super(props);


    this.state = {
      name: null,
      messages: null,
      id: this.props.match.params.id,
      image: null,
      users:null
    };
    this.chatService = new ChatService();
  }

  componentDidMount() {

    this.socket = io("http://localhost:5000");
    this.socket.on("connect", () =>
      console.log("connected to back via websockets")
    );
    this.socket.on("disconnect", () =>
      console.log("DISconnected to back via websockets")
    );

    this.socket.on("chatMsg", data => this.addMessage(data));



    console.log(this.state.id)

    this.chatService.getIndividualChat(this.state.id).then(response => {
    console.log("holaaaa",response)
      this.setState({
        ...this.state,
        name: response.user,
        messages: response.chat.messages,
        image: response.user,
        users: response.chat.users
      });
    });
  }

  addMessage = message => {
    this.setState(state => ({ messages: [...state.messages, message] }));
    this.chatService.addMessage(this.state.id, message);
  };

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input

    const message = {
      name: this.state.name.username,
      message: messageString,
      id: this.state.id,
      image: this.state.name.image
    };

    this.socket.emit("chatMsg", message);
    this.addMessage(message);
  };

  parserDate = () => {
    let newDate = new Date(this.state.plan.date);
    return newDate;
  };

  printChat = () => {
    let plan = this.state.plan
    return (
      <React.Fragment>
        <Nav title={"Chat"}
          iconleft={Left}
          iconright={Notifications}
          widthR={"17px"}
          heigthR={"17px"}
          widthL={"9px"}
          heigthL={"6px"}
        />
       
        <section className="section-chat">
          {this.state.messages.map((message, index) => (
            <ChatMessage
              image={message.image}
              key={index}
              message={message.message}
              name={message.name}
              userConected={this.state.name.username}
            />
          ))}
        </section>
        <div className="input-chat-page">
          <ChatInput
            ws={this.ws}
            onSubmitMessage={messageString => this.submitMessage(messageString)}
          />
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div>
        {this.state.name !== null &&
         this.state.messages !== null &&
         <div>{this.printChat()}</div>
         }
      </div>
    );
  }
}
