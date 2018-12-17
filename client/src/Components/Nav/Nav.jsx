import React, { Component } from "react";
import "../Nav/Nav.css";

export default class Nav extends Component {
  constructor() {
    super();

    this.state = {
      tittle: "this.props.title",
      lupa: "lupa",
      campana: "camapana"
    };
  }

  render() {
    return (
      <React.Fragment>
        <nav className="nav-upper">
            <div className="tittle-inside">{this.state.lupa}</div>
            <div className="tittle-inside">{"tittle"}</div>
            <div className="tittle-inside" >{this.state.campana}</div>
        </nav>
      </React.Fragment>
    );
  }
}
