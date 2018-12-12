import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class HomePage extends Component {
  render() {
    return (

      <div>
        <Link to={"/signup"}><p>SignUp</p></Link>
        <Link to={"/login"}><p>LogIn</p></Link>
     
      </div>
    )
  }
}
