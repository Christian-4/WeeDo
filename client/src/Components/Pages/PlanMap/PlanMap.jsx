import React, { Component } from "react";
import { Link } from "react-router-dom";
import Map from "../../Map/Map.jsx";
import PlanService from "../../PlansService";
import Left from "../../../icons/icons/left.png";
import Nav from "../../Nav/Nav.jsx";
import "./PlanMap.css"

export default class PlanMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plan_id: this.props.match.params.id,
      plan: null
    };

    this.planService = new PlanService();
  }

  componentDidMount() {
    this.planService.getPlan(this.state.plan_id).then(response => {
      console.log("plan", response);
      this.setState({ ...this.state, plan: response.plan });
    });
  }

  printMap = () => {
    console.log(this.state.plan);
    return (
      <React.Fragment>
         <Link to={`/plan/${this.state.plan._id}`}><span className="buttonBackMap"></span></Link>
        <Map center={this.state.plan.location.coordinates} view={true} />
      </React.Fragment>
    );
  };

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
        {this.state.plan !== null && <div> {this.printMap()} </div>}
      </div>
    );
  }
}
