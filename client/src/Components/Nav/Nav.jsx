import React, { Component } from "react";
import "../Nav/Nav.css";

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      left: this.props.iconleft,
      right: this.props.iconright,
      widthR: this.props.width,
      heightR: this.props.height
    };
  }

  render() {
    return (
      <React.Fragment>
        <nav className="nav-upper">
            <div className="title-inside left"><img src= {this.state.left}  width={this.props.widthL} height={this.props.heightL}></img></div>
            <div className="title-inside">{this.state.title}</div>
            <div className="title-inside right" ><img src= {this.state.right}  width={this.props.widthR} height={this.props.heightR}></img></div>
        </nav>
      </React.Fragment>
    );
  }
}
