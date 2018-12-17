import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class HomePage extends Component {

    constructor(props){
      super(props)
      this.props = props

      this.state = {
        
      }
    }

 

  

  render() {
    return (
      <div>
        <Link to={"/signup"}><p>SignUp</p></Link>
        <Link to={"/login"} > <p>LogIn</p></Link>
        <Link to={"/newplan"}><p>New Plan</p></Link>
        <Link to={"/chat"}><p>Chat</p></Link>
        <Link to={"/chats"}><p>Chats</p></Link>
        <Link to={"/profile"}><p>View Profile</p></Link>
        <Link to={"/plans"}><p>View Plans</p></Link>
        <Link to={"/friends"}><p>View Friends</p></Link>
        <Link to={`/allusers/`}><p>All Users</p></Link>
        <Link to={`/profile/`}><p>My profile</p></Link>
        <Link to={`/notifications`}><p>Notifications</p></Link>
        <Link to={`/favourites`}><p>Favourites Plans</p></Link>
        <Link to={`/plansgo`}><p>Planes a los que voy</p></Link>
        <Link to={`/ownplans`}><p>Planes creados por mi</p></Link>
      </div >
    )
  }
}
