import React, { Component } from 'react'
import Map from "../../Map/Map.jsx";
import PlanService from "../../PlansService";
import Left from "../../../icons/icons/left.png";
import Nav from "../../Nav/Nav.jsx";

export default class PlansMap extends Component {
  render() {
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
      </div>
    )
  }
}
