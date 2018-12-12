import React, { Component } from 'react'
import hobbies from "./hobbies.json"

export default class Hobbies extends Component {

    constructor() {
        super();
        this.state = {
          hobbies: hobbies
        };
      }

  render() {
    return (
      <React.Fragment>
        <div>
            <ul>
                 {this.state.hobbies.map((hobbie)=>(
                    <li>{hobbie.name}</li>
                ))}
            </ul>
        </div>
      </React.Fragment>
    )
  }
}
