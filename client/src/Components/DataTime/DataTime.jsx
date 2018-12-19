import React, { Component } from "react";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "../DataDate/DataDate.jsx";
mobiscroll.settings = {
  theme: "ios",
  display: "bubble"
};

export default class DataTime extends Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
    this.props = props
  }


  show() {
    this.refs.external.instance.show();
  }
  render() {
    var now = new Date();
    return (
      <React.Fragment>
        <mobiscroll.Time 
        placeholder="Hora" 
        inputStyle="box" 
        className="date-div input-date input-time" 
        onChange={e => this.props.timeChange(e)} />
      </React.Fragment>
    );
  }
}
