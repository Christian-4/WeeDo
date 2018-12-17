import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "./Tapbar.css"

export default class Tapbar extends Component {
  render() {
    return (
      <div className="Tapbar">
        <div><Link to={"/plans"}>H</Link></div>
        <div><Link to={"/plansgo"}>P</Link></div>
        <div><Link to={"/newplan"}>+</Link></div>
        <div><Link to={"/friends"}>F</Link></div>
        <div><Link to={"/profile"}>M</Link></div>
      </div>
    )
  }
}
