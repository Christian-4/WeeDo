import React, { Component } from 'react'
import "./StyleInput.css"

export default class StyleInput extends Component {
  constructor(props){
    super(props)

    this.state = {
      label: this.props.label,
      placeholder: this.props.placeholder
    }
  }


handleChange = (event)=>{
  console.log(event.target)
}

  render() {
    return (
      <React.Fragment>
        <label className="label-basic-data">{this.props.label}</label>
        <input className ="input-basic-data" placeholder={this.state.placeholder} onChange={e=>this.handleChange(e)}></input>
      </React.Fragment>
    )
  }
}
