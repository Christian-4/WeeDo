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
import Calendar from "../../../icons/icons/calendarcopy.png"
import LocationIcon from "../../../icons/icons/location.png"
import ClockIcon from "../../../icons/icons/hour.png"

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

const weekDays = [
  "Dom",
  "Lun",
  "Mar",
  "Mie",
  "Jue",
  "Vie",
  "Sab"
]

export default class ChatPage extends Component {
  constructor(props) {
    super(props);


    this.state = {
      name: null,
      messages: null,
      id: this.props.match.params.id,
      plan: null,
      owner: null,
      users: null,
      image: null
    };
    this.chatService = new ChatService();
  }

  componentDidMount() {

    this.socket = io(`${process.env.REACT_APP_API_URL}`);
    this.socket.on("connect", () =>
      console.log("connected to back via websockets")
    );
    this.socket.on("disconnect", () =>
      console.log("DISconnected to back via websockets")
    );

    this.socket.on("chatMsg", data => this.addMessage(data));




    this.chatService.getChat(this.state.id).then(response => {

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
    setTimeout(() => {
      var elmnt = document.getElementById("chat");
      elmnt.scrollTop = elmnt.scrollHeight
    }, 1)
    let plan = this.state.plan
    return (
      <React.Fragment>
        <Nav title={this.state.plan.title}
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
                {<img src={Calendar} />}
                {weekDays[this.parserDate().getDay()] + ", "}
                {this.parserDate().getUTCDate() + " "}
                {monthNames[this.parserDate().getMonth()]}
              </div>
              <div className="plan-hour">
                <img src={ClockIcon} />
                {this.parserDate().getUTCHours() +
                  ":" +
                  this.parserDate().getMinutes()}
              </div>
            </div>
            <div className="plan-location">
              {<img src={LocationIcon} />}
              <div>{"this.state.plan.location"}</div>
            </div>
            <div className="div-data-users">
              <div className="bot-plan-card">
                <p className="assistantsPlan">Van a acudir</p>
                <div className="assistantsUsers">
                  {this.state.users.map(function (user, index) {
                    return (
                      <Link to={`/participants/${plan._id}`} className="link-profiles">
                        <img className="image-asisentes" src={user.image} />
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div>
                <Link to={`/profile/${this.state.owner._id}`}><img className="owner-image" src={this.state.owner.image} /></Link>
              </div>
            </div>
          </div>
        </section>
        <section className="state-plan-div">
          <p>En proceso</p>
        </section>
        <section className="section-chat" id="chat">
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
