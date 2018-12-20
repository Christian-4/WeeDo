import React, { Component } from "react";
import "./InputCreatePlan.css";

export default class InputCreatePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      placeholder: this.props.placeholder,
      name: this.props.name,
      type: this.props.type
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="div-input">
          <label className="name-label">{this.state.label}</label>
          <input
            name = {this.props.name}
            type={this.props.type}
            className="input"
            placeholder={this.state.placeholder}
            onChange={e => this.props.handleChange(e)}
          />
        </div>
      </React.Fragment>
    );
  }
}
