import React, { Component } from "react";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "./DataDate.css";

mobiscroll.settings = {
  theme: "ios",
  
};
export default class DataDate extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      val: "Fecha"
    };

    this.show = this.show.bind(this);
  }

  getDate = e => {
    console.log(e);
  };

  show() {
    this.refs.external.instance.show();
  }
  render() {
    return (
      <React.Fragment>
          <mobiscroll.Date
            placeholder="Fecha"
            inputStyle="box"
            className="date-div input-date"
            onChange={e => this.props.dateChange(e)}
          />
    
      </React.Fragment>
    );
  }
}
