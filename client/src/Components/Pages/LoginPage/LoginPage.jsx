import React, { Component } from 'react'
import "./LoginPage.css"
import FormLogin from "../../FormLogin/FormLogIn.jsx"
import FacebookLogin from "react-facebook-login";


const responseFacebook = response => {
  console.log(response);
};

export default class LoginPage extends Component {

  constructor(props){
    super()

    this.props = props

  }


  render() {
    return (
      <div>
        <FormLogin getUserSession= {this.props.getUserSession} />


        {/* <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_ID}
          autoLoad={true}
          fields="name,email,picture"
          textButton = "Login with FaceBook"
          callback={responseFacebook}
        /> */}
      </div>
    )
  }
}
