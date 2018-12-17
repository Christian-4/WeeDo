import React, { Component } from 'react'
import AuthService from "../AuthService"
import {Redirect} from "react-router-dom";

export default class Logout extends Component {
    constructor() {
        super()
        this.state = {
            user: {}
        }

        this.authService = new AuthService();
    }

    logout = () => {
        this.authService.logout()
            .then(() => this.setState({ ...this.state, user: null }))
        
     
    };

    render() {

        if(this.state.user === null) {
            return <Redirect to="/login" />
          }
    
        return (
            <div>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}
