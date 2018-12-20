import React, { Component } from "react";
import ChatInput from "../../ChatInput/ChatInput.jsx";
import ChatMessage from "../../ChatMessage/ChatMessage.jsx";
import ChatService from "../../ChatService";
import ChatManager from "../../../chat/chatManager";
import Nav from "../../Nav/Nav.jsx";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import "./ChatPage.css";
import Notifications from "../../../icons/icons/notifications.png"
import Left from "../../../icons/icons/left.png"

const monthNames = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

export default class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.chatManager = new ChatManager(() => {
      console.log(this.chatManager.getMessages())
      this.setState({messages: this.chatManager.getMessages()})
    });

    this.state = {
      name: null,
      messages: this.chatManager.getMessages(),
      id: this.props.match.params.id,
      plan: null,
      owner: null,
      users: null,
      image: null
    };
    this.chatService = new ChatService();
  }

  componentDidMount() {
    this.chatService.getChat(this.state.id).then(response => {
      console.log(response);
      this.setState({
        ...this.state,
        name: response.user,
        messages: response.chat.messages,
        plan: response.chat.plan,
        owner: response.owner,
        users: response.chat.users,
        image: response.user
      });
    });
  }

  addMessage = message => {
    this.setState(state => ({ messages: [...state.messages, message] }));
    this.chatManager.callbackMesgChange();
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
    this.chatManager.sendMessage(message);
    this.addMessage(message);
  };

  parserDate = () => {
    let newDate = new Date(this.state.plan.date);
    return newDate;
  };

  printChat = () => {
    return (
      <React.Fragment>
         <Nav  title={this.state.plan.title} 
        iconleft={Left} 
        iconright={Notifications} 
        widthR={"17px"} 
        heigthR={"17px"} 
        widthL={"9px"} 
        heigthL={"6px"}
        />
        <section className="plan-data-section">
          <div className="plan-data">
            <div className="plan-date">
              <div className="month">
                {this.parserDate().getUTCDate()}
                {monthNames[this.parserDate().getMonth()]}
              </div>
              <div className="plan-hour">
                {this.parserDate().getUTCHours() +
                  ":" +
                  this.parserDate().getMinutes()}
              </div>
            </div>
            <div className="plan-location">
              <div>{"location"}</div>
            </div>
            <div className="div-data-users">
              <div className="bot-plan-card">
                <p className="assistantsPlan">Van a acudir</p>
                {this.state.users.map(function(user, index) {
                  return (
                    <Link to={`/profile/${user._id}`} className="link-profiles">
                      <img className="image-asisentes" src={user.image} />
                    </Link>
                  );
                })}
              </div>
              <div>
                <img className="owner-image" src={this.state.owner.image} />
              </div>
            </div>
          </div>
        </section>
        <section className="state-plan-div">
          <p>En proceso</p>
        </section>
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
          this.state.owner !== null &&
          this.state.users !== null &&
          this.state.plan !== null && <div>{this.printChat()}</div>}
      </div>
    );
  }
}
