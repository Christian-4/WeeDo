import React, { Component } from 'react'
import AuthService from "../AuthService"

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
            .then(() => this.setState({ ...this.state, user: null }));
    };

    render() {
        return (
            <div>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}
