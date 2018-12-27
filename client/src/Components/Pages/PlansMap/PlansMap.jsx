import React, { Component } from 'react'
import Map from "../../Map/Map.jsx";
import PlansService from "../../PlansService";
import UserService from "../../UserService";
import Left from "../../../icons/icons/left.png";
import Nav from "../../Nav/Nav.jsx";
import Slider from "react-slick";
import { geolocated } from 'react-geolocated'
import './PlansMap.css'
import PlanCard from '../../PlanCard/PlanCard.jsx'


class PlansMap extends Component {

  constructor() {
    super()



    this.state = {
      plans: null,
      location: {
        lat: null,
        lng: null
      },
      user: null
    }

    this.planService = new PlansService()
    this.UserService = new UserService()
  }




  componentDidMount() {

    this.planService.getAllPlans()
      .then(response => {

        this.UserService.getUser()
          .then(responseuser => {
            console.log(this.props.coords)
            if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
              let ltd = 36.51543 //this.props.coords.latitude;
              let lng = -4.88583//this.props.coords.longitude;


              let array = response.plans.filter(function (plan) {
                return plan.location.coordinates.lat + plan.location.coordinates.lng + 5 <= ltd - lng
              })

              this.setState({ ...this.state, location: array[0].location.coordinates, plans: array, user: responseuser.user })

            }
          })

      })
  }

  printMap = () => {
    console.log(this.state.plan);
    return (
      <React.Fragment>
        <Map center={this.state.location} view={true} />
      </React.Fragment>
    );
  };

  render() {

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: 'slider',
      arrows:false,
      centerMode: true,
      adaptiveHeight: true,
      centerPadding:'20px'
  

    };

    return (
      <div>
        <Nav
          title={"Mapa"}
          iconleft={Left}
          iconright={""}
          widthR={"20px"}
          heigthR={"20px"}
          widthL={"9px"}
          heigthL={"6px"}
        />

        {this.state.plans !== null &&
          this.state.location.lat !== null &&
          this.state.location.lng != null &&

          <React.Fragment>
           
              <div> {this.printMap()} </div>
              <Slider {...settings}>
                
                  {this.state.plans.map(function (plan) {
                    return (
                      <div className="individualCard">
                        <PlanCard
                          plan={plan}
                          user={this.state.user}
                        />
                      </div>

                    )

                  }.bind(this))}

               
              </Slider>
          

          </React.Fragment>
        }
      </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(PlansMap);

