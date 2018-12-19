import React, { Component } from "react";
import { GoogleComponent } from "react-google-location";
import "../SearchInput/SearchInput.css"
const API_KEY = "AIzaSyCUoFH2viWnRWQJPqZi5AUqBGOPTQqlF-A";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
      label: "Lugar"
    };
  }

  render() {
    return (
      <div>
        <div className="div-input-search">
        <label className="name-label-search">{this.state.label}</label>
          <GoogleComponent
            apiKey={API_KEY}
            language={"eS"}
            country={"country:in|country:es"}
            coordinates={true}
            placeholder="busqueda"
            locationBoxStyle={'input'}
            locationListStyle={'list-style'}
            onChange={e => {
              this.props.locationChange({ place: e });
            }}
          />
        </div>
      </div>
    );
  }
}
