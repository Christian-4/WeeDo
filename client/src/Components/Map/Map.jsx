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
      center: this.props.center,
      update: false
    }

    this.PlansService = new PlansService()
  }

  onMapClicked = (props, e, marker) => {
    
    let latitude = Object.values(marker.latLng)[0]();
    let longitude = Object.values(marker.latLng)[1]();
    this.setState({ ...this.state, lat: latitude, lng: longitude});
    this.props.locationPlan({lat: latitude, lng: longitude})

  };



  updateCenter = () => {
    this.setState({...this.state,center:this.props.center,update:true})
  }


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
        
        center={coords}
        google={this.props.google}
        initialCenter={coords}
        onClick={this.onMapClicked}
        style={{ width: "375px", height: "510px", position: "" }}
        visible={this.props.showMap}
        disableDefaultUI={true}
        bounds = {this.props.google.maps.LatLngBounds(this.state.center)}
        onTilesloaded={() => this.updateCenter()}
        onCenterChanged={() => this.updateCenter()}
      >
        

        <Marker 
        onClick={this.onMarkerClick}
        name={'Current location'}
        position={coords}
        animation={this.props.google.maps.Animation.BOUNCE}
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
