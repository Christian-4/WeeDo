import React, { Component } from 'react'
import Nav from "../../Nav/Nav.jsx"
import DropDownHobbies from "../../DropDownHobbies/DropDownHobbies.jsx"
import data from "./data.json"
import { Link } from "react-router-dom"
import UserService from "../../UserService"
import "./ConfigureHobbies.css"

export default class ConfigureHobbies extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: data,
            keys: Object.keys(data),
            hobbiesSelected: ["Interés", "Interés", "Interés", "Interés", "Interés"],
            className: "finalizar-configure-data invisible-button",
            user: null
        }

        this.UserService = new UserService()
       
    }

    componentDidMount = () => {
        if(this.props !== undefined){
            this.setState({...this.state,user: this.props.user})
        }
    }


    addHobbySelected = (hobby) => {

        let index = this.state.hobbiesSelected.indexOf("Interés")

        let arrayHobbiesSelected = this.state.hobbiesSelected;

        arrayHobbiesSelected[index] = hobby.name;
        this.setState({ ...this.state, hobbiesSelected: arrayHobbiesSelected, className:"finalizar-configure-data visible-button" })
        
    }

    saveData = () => {
        let updateUser = this.props.user

        let hobbies = this.state.hobbiesSelected.filter(hobby =>{
            return hobby !=="Interés"
        })
        updateUser.hobbies = hobbies

        this.UserService.saveHobbies(updateUser)
        .then(response =>{})
        .catch(err=>{})
    }

    render() {
        return (
            <React.Fragment>
                <Nav
                    title={"Configurar tu perfil"}
                />

                <p className="title-configure">¿Qué cosas te gusta hacer?</p>

                <div className="hobbies-selected">
                    {this.state.hobbiesSelected.map(hobby => {
                        return (

                            <div>
                                <div className="configue-hobbies-mask">
                                    {hobby.includes("Interés")

                                        ?
                                        ""
                                        :

                                        <img src={require(`../../../icons/icons/${hobby}.png`)} alt="h-image" className="drop-down-hobbie-image"></img>

                                    }
                                </div>
                                <p className="name-hobbie">{hobby}</p>
                            </div>
                        )


                    })}

                </div>

                {
                    this.state.keys.map(key => {
                        return (
                            <DropDownHobbies addHobbySelected={this.addHobbySelected} listItems={this.state.data[key]} title={key} />

                        )
                    })
                }

                <Link to={"/"}><button className={this.state.className} onClick={this.saveData}>Finalizar</button></Link>

            </React.Fragment>
        )
    }
}
