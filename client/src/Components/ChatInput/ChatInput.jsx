import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ChatInput.css"

export default class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired
  };
  state = {
    message: ""
  };

  render() {
    return (
      <form
        action="."
        onSubmit={e => {
          e.preventDefault();
          this.props.onSubmitMessage(this.state.message);
          this.setState({ message: "" });
        }}
      >
        <input
          className="input-chat"
          type="text"
          placeholder={"Enter message..."}
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
        <input className="button-input" type="submit" value={"Send"} />
      </form>
    );
  }
}
