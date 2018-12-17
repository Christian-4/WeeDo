import React, { Component } from "react";
import "./SignupPage.css";
import ReactDOM from 'react-dom';
import FacebookLogin from "react-facebook-login";
import Form from "../../FormSingUp/FormSingUp"

const responseFacebook = response => {
  console.log(response);
};

export default class SignupPage extends Component {
  render() {
    return (
      <React.Fragment>
        
        <Form profile={false}/>
        {/* <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_ID}
          autoLoad={true}
          fields="name,email,picture"
          textButton = "Continue with FaceBook"
          callback={responseFacebook}
        /> */}
      </React.Fragment>
    );
  }
}
