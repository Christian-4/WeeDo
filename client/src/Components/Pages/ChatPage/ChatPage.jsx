import React, { Component } from "react";
import ChatInput from "../../ChatInput/ChatInput.jsx";
import ChatMessage from "../../ChatMessage/ChatMessage.jsx";
import ChatService from "../../ChatService";
import Nav from "../../Nav/Nav.jsx";
import "./ChatPage.css";

// const URL = "ws://localhost:3030";
 const URL = "ws://https://weed0.herokuapp.com/"

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

    this.state = {
      name: null,
      messages: null,
      id: this.props.match.params.id,
      plan: null
    };

    this.chatService = new ChatService();
  }

  ws = new WebSocket(URL);

  componentDidMount() {
    this.chatService.getChat(this.state.id).then(response => {
      
      this.setState({
        ...this.state,
        name: response.user,
        messages: response.chat.messages,
        plan: response.chat.plan
      });
    });

    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected", "you chat id is " + this.state.id);
    };

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      if (message.id === this.state.id) {
        this.addMessage(message);
      }
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL)
      });
    };
  }

  parserDate = () => {
    let newDate = new Date(this.state.plan.date);
    return newDate;
  };

  printChat = () => {
    return (
      <React.Fragment>
        <Nav />
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
            <div className="text-data">
              <p>Van a acudir</p>
            </div>
            <div className="asistentes">
                  <img src=""></img>
            </div>
          </div>
        </section>

        <ChatInput
          ws={this.ws}
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />

        {this.state.messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            name={message.name}
          />
        ))}
      </React.Fragment>
    );
  };

  addMessage = message => {
    this.setState(state => ({ messages: [...state.messages, message] }));
    this.chatService.addMessage(this.state.id, message);
  };

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input

    const message = {
      name: this.state.name,
      message: messageString,
      id: this.state.id
    };
    this.ws.send(JSON.stringify(message));
    this.addMessage(message);
  };

  render() {
    return (
      <div>
        {this.state.name !== null &&
          this.state.messages !== null &&
          this.state.plan && <div>{this.printChat()}</div>}
      </div>
    );
  }
}
