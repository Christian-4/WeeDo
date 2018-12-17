import React, { Component } from "react";
import ChatInput from "../../ChatInput/ChatInput.jsx";
import ChatMessage from "../../ChatMessage/ChatMessage.jsx";
import ChatService from "../../ChatService";


const URL = "ws://localhost:3030";

export default class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      messages: null,
      id:  this.props.match.params.id
    }

    this.chatService = new ChatService()
  }

  ws = new WebSocket(URL);

  componentDidMount() {
    this.chatService.getChat(this.state.id)
    .then(response => { 
      console.log(response)
        this.setState({...this.state, name: response.user, messages: response.chat.messages})
    })

    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected", "you chat id is " + this.state.id);
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      if (message.id === this.state.id) {
        this.addMessage(message);
      }
    }

    this.ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL)
      })
    }


  }

  printChat = () => {
    return (
      <div>
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
      </div>
    );
  };

  addMessage = message =>{
    this.setState(state => ({ messages: [...state.messages, message] }));
    this.chatService.addMessage(this.state.id,message);}

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
        {
           this.state.name !== null &&  this.state.messages !==null &&
           <div>{this.printChat()}</div>
        }
      </div>
    )
  }
}
