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
      user: null,
      update:false
    }

    this.planService = new PlansService()
    this.UserService = new UserService()
  }




  componentDidMount() {

    this.planService.getAllPlans()
      .then(response => {

        this.UserService.getUser()
          .then(responseuser => {
            let ltd =parseFloat(responseuser.user.location.split(',')[2]) //this.props.coords.latitude;
            let lng =parseFloat(responseuser.user.location.split(',')[3])//this.props.coords.longitude;
            if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
                if(this.props.coords !=null){
                  ltd = this.props.coords.latitude;
                  lng = this.props.coords.longitude;
                }

              let array = response.plans.filter(function (plan) {
                return plan.location.coordinates.lat + plan.location.coordinates.lng + 5 <= ltd - lng
              })

              if(array.length > 0){
                this.setState({ ...this.state, location: array[0].location.coordinates, plans: array, user: responseuser.user })
              }


            }
          })

      })
  }

  printMap = () => {
    console.log(this.state.plan);
    return (
      <React.Fragment>
        <Map center={this.state.location} view={true} update={this.state.update}/>
      </React.Fragment>
    );
  };

  

  handleSlideCard = (index) => {

   let location = {
      lat: null,
      lng: null
    }


    location.lat =  this.state.plans[index].location.coordinates.lat;
    location.lng =  this.state.plans[index].location.coordinates.lng;

    this.setState({...this.state,location,update:true})
    
  }

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
      centerPadding:'20px',
      focusOnSelect:true,
      afterChange: (index) => (this.handleSlideCard(index))
  
    }

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

