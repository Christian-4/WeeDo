import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import PlansService from "../PlansService"


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlace: {
        name: "Madrid"
      },

      lat: 40.4060957,
      lng: -3.6990324,
      activeMarker: {},
      center: this.props.center
    }

    this.PlansService = new PlansService()
  }

  onMapClicked = (props, e, marker) => {
    
    let latitude = Object.values(marker.latLng)[0]();
    let longitude = Object.values(marker.latLng)[1]();
    this.setState({ ...this.state, lat: latitude, lng: longitude});
    this.props.locationPlan({lat: latitude, lng: longitude})

  };





  render() {
    let coords
    if(this.props.view){
      coords = this.props.center
    }else{
      coords = { lat: this.state.lat, lng: this.state.lng };
      
    }
     
    

    return (
      <div style={{ height: '20vh', width: '20h' }}>
           <Map
        initialCenter={this.props.center}
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ width: "375px", height: "510px", position: "" }}
        visible={this.props.showMap}
    
      >
        

        <Marker 
        onClick={this.onMarkerClick}
        name={'Current location'}
        position={coords}
         />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
      </div>
    );
     
     
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCUoFH2viWnRWQJPqZi5AUqBGOPTQqlF-A"
  
})(MapContainer);
