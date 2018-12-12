import React, { Component } from 'react'
import "./LoginPage.css"
import FormLogin from "../../FormLogin/FormLogIn.jsx"
import FacebookLogin from "react-facebook-login";


const responseFacebook = response => {
  console.log(response);
};

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <FormLogin />


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
