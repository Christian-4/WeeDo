import React, { Component } from 'react'
import "./StyleInput.css"

export default class StyleInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      label: this.props.label,
      placeholder: this.props.placeholder,
      numTelf: this.props.numtelf
    }

    this.props = props
  }



  render() {
    return (
      <React.Fragment>
        <label className="label-basic-data">{this.props.label}</label>
        {this.state.numTelf

          ?
          <div className="num-telf-div">
            <input className="input-basic-data ind" placeholder={"+34"} onChange={e => this.props.handleChangeBasicData(e)}></input>
            <input name={this.props.name} className="input-basic-data num-telf" placeholder={this.state.placeholder} onChange={e => this.props.handleChangeBasicData(e)}></input>
          </div>
          :
          <input name={this.props.name} className="input-basic-data" placeholder={this.state.placeholder} onChange={e => this.props.handleChangeBasicData(e)}></input>

        }
      </React.Fragment>
    )
  }
}
