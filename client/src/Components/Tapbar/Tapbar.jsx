import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "./Tapbar.css"
import Home from "../../icons/TabBar/HomeColor.png"
import MisPlanes from "../../icons/TabBar/MisPlanesColor.png"
import Anadir from "../../icons/TabBar/AnadirPlanColor.png"
import Conexiones from "../../icons/TabBar/ConexionsColor.png"
import MiPerfil from "../../icons/TabBar/MiPerfilColor.png"

export default class Tapbar extends Component {
  render() {
    return (
      <div className="Tapbar">
        <div><Link to={"/plans"}><img src={Home}/></Link></div>
        <div><Link to={"/plansgo"}><img src={MisPlanes}/></Link></div>
        <div><Link to={"/newplan"}><img src={Anadir}/></Link></div>
        <div><Link to={"/friends"}><img src={Conexiones}/></Link></div>
        <div><Link to={"/profile"}><img src={MiPerfil}/></Link></div>
      </div>
    )
  }
}
