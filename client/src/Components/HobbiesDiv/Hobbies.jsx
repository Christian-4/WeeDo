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

  hobbieClicked =  (e) => {
    let  {name, value} = e.target;
    this.state.hobbiesSelected.push( e.target.getAttribute('id'))
  }

  render() {
    return (
      <React.Fragment>
        <div>
            <ul>
                 {this.state.hobbies.map((hobbie)=>(
                    <li id={`${hobbie.name}`} name="deportes" value="deportes" onClick={e => this.hobbieClicked(e)}>{hobbie.name}</li>
                ))}
            </ul>
        </div>
      </React.Fragment>
    )
  }
}
