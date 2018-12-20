import ChatService from "../Components/ChatService";
import io from "socket.io-client";

export default class ChatManager {

  constructor(callbackMesgChange) {

    this.callbackMesgChange = callbackMesgChange;
    this.socket = io("http://localhost:3000");
    this.socket.on("connect", () =>
      console.log("connected to back via websockets")
    );
    this.socket.on("disconnect", () =>
      console.log("DISconnected to back via websockets")
    );

    this.socket.on("chatMsg", data => this.msgFromServer(data));

    this.messages = [];

    this.chatService = new ChatService();
  }

  getMessages() {
    return this.messages;
  }

  sendMessage(message) {
    this.messages.push(message);
    this.callbackMesgChange();
    this.socket.emit("chatMsg", message);
  }

  msgFromServer(message) {
      console.log("llegan mensajes")
    this.messages.push(message);
    this.callbackMesgChange();
  }

  addMessage = message => {
    this.setState(state => ({ messages: [...state.messages, message] }));
    this.chatService.addMessage(this.state.id, message);
  };
}
