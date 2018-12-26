import React, { Component } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import "../Nav/Nav.css";

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      left: this.props.iconleft,
      right: this.props.iconright,
      widthR: this.props.width,
      heightR: this.props.height,
      route: this.props.route
    };
  }

  render() {
    return (
      <React.Fragment>
        <nav className="nav-upper">
            <div className="title-inside left"><img src= {this.state.left}  width={this.props.widthL} height={this.props.heightL}></img></div>
            <div className="title-inside">{this.state.title}</div>
            <Link to={`${this.state.route}`} plan={this.state.plan}>
            <div className="title-inside right" ><img src= {this.state.right}  width={this.props.widthR} height={this.props.heightR} onClick={this.props.iconClicked} ></img></div>
            </Link>
        </nav>
      </React.Fragment>
    );
  }
}
