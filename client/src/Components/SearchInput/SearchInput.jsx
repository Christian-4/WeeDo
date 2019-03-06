import React, { Component } from "react";
import { GoogleComponent } from "react-google-location";
import "../SearchInput/SearchInput.css"
const API_KEY = "AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
      label: "Localización",
      boxStyle: this.props.boxStyle,
      listStyle: this.props.listStyle
    };
  }

  render() {
    return (
      <div>
        <label className="name-label-search">{this.state.label}</label>
        <div className="div-input-search locationCreatePlan">
          <GoogleComponent
            apiKey={API_KEY}
            language={"es"}
            country={"country:in|country:es"}
            coordinates={true}
            placeholder="busqueda"
            locationBoxStyle={this.state.boxStyle}
            locationListStyle={this.state.listStyle}
            onChange={e => {
              this.props.locationChange({ place: e });
            }}
          />
        </div>
      </div>
    );
  }
}
