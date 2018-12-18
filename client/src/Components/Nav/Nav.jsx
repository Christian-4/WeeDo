import React, { Component } from "react";
import "../Nav/Nav.css";

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      left: this.props.iconleft,
      right: this.props.iconright
    };
  }

  render() {
    return (
      <React.Fragment>
        <nav className="nav-upper">
            <div className="tittle-inside">{this.state.left}</div>
            <div className="tittle-inside">{this.state.title}</div>
            <div className="tittle-inside" >{this.state.right}</div>
        </nav>
      </React.Fragment>
    );
  }
}
