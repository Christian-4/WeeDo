import React, { Component } from "react";
import { Link } from "react-router-dom"
import "./InitialPage.css"


export default class FormLogIn extends Component {
    constructor(props) {
        super(props);

        this.props = props;

    }

    render() {
        return (
            <div className="initialPage">
                <div className="initialPageDiv">
                    <Link to={"/login"}><button className="initialPageLogin">Login</button></Link>
                    <Link to={"/signup"}><span className="initialPageSignup">¿Aún no tienes una cuenta? <span className="initialPageSignupBold">Regístrate</span></span></Link>
                </div>
            </div>
        )
    }
}