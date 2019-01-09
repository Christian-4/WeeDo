import React, { Component } from 'react'
import Down from "../../icons/icons/down.png"
import Up from "../../icons/icons/up.png"
import "./DropDownHobbies.css"

export default class DropDownHobbies extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: Down,
            title: this.props.title,
            showMenu: false,
            listItems: this.props.listItems
        }
    }


    showMenu = (e) => {
        if(this.state.showMenu){
            this.setState({ ...this.state, showMenu: false, image:Down })
        }else{
            this.setState({ ...this.state, showMenu: true, image:Up })
        }
       
    }
    render() {
        return (
            <React.Fragment>
                <div className="div-drop-down">
                    <p className="title-drop-down">{this.state.title}</p>
                    <img src={this.state.image} name="title-drop-down" className="arrow-image" onClick={e => this.showMenu(e)}></img>
                </div>
                {this.state.showMenu
                    ?
                    <div className="hobbies-menu">

                        {this.state.listItems.map(item => {
                            return (
                                <div className="div-pack-hobbie">
                                    <div className="drop-down-mask"  onClick={e => this.props.addHobbySelected(e.target)}>
                                        <img name={item} src={require(`../../icons/icons/${item}.png`)} alt="h-image" className="drop-down-hobbie-image"></img>
                                    </div>
                                    <p className="name-hobbie">{item}</p>
                                </div >
                            )
                        })}

                    </div>
                    :
                    ""
                }
            </React.Fragment>
        )
    }
}
