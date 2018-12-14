import React, { Component } from 'react'
import hobbies from "./hobbies.json"

export default class Hobbies extends Component {

    constructor() {
        super();
        this.state = {
          hobbies: hobbies,
          hobbiesSelected: []
        };
      }


  render() {
    return (
      <React.Fragment>
        <div>
            <ul>
                 {this.state.hobbies.map((hobbie)=>(
                    <li id={`${hobbie.name}`} name="deportes" value="deportes" onClick={e => this.props.selectHobbies(e)}>{hobbie.name}</li>
                ))}
            </ul>
        </div>
      </React.Fragment>
    )
  }
}
