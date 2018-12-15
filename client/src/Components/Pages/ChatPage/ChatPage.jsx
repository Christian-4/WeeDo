import React, { Component } from 'react'
import ChatInput from '../../ChatInput/ChatInput.jsx'
import ChatMessage from '../../ChatMessage/ChatMessage.jsx'


const URL = 'ws://localhost:3030'


export default class ChatPage extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      name: 'Bob',
      messages: [],
      id: this.this.props.match.params.id
    }
  }

    
  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected', "you chat id is "+ this.state.id)
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      if(message.id === this.state.id){
        this.addMessage(message)
      }
     
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }


  addMessage = message =>
  this.setState(state => ({ messages: [message, ...state.messages] }))


  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    
    const message = { name: this.state.name, message: messageString, id: this.state.id }
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }
  
  render() {
    return (
      <div>
        <input
            type="text"
            id={'name'}
            placeholder={'Enter your name...'}
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />

          <ChatInput
          ws={this.ws}
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />

         {this.state.messages.map((message, index) =>
          <ChatMessage
            key={index}
            message={message.message}
            name={message.name}
          />,
          
        )}
        
      </div>
    )
  }
}
