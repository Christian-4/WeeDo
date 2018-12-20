import React, { Component } from "react";
import UserService from '../../UserService';
import "./ProfilePage.css"
import Nav from "../../Nav/Nav"

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      userId: this.props.match.params.id
    }

    this.UserService = new UserService()
  }

  componentDidMount() {

    this.UserService.getProfile(this.state.userId)
    .then(response => {
        this.setState({...this.state, user: response.user})
    })
  }

  printUser = () =>{
    return (
      <div className="profile">
          <div className="profileHeader">
            <img src={this.state.user.image} />
            <div className="profileHeaderText">
              <p className="name">{this.state.user.username}</p>
            </div>
          </div>
          <div className="sobreMi">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere maxime tempora laudantium itaque nobis culpa beatae sunt ipsum iste dicta cum exercitationem obcaecati, non dolore rem provident architecto. Iusto, nobis!</p>
          </div>
          <div className="myIntereses">
            <label>Intereses</label>
            <div className="myInteresesDivs">
              {this.state.user.hobbies.map(function(hobby,index){
                return(
                  <div className="myInteresesDiv">
                   
                  </div>
                )
              })}
            </div>
          </div>
        </div>
    )
  }

  render() {
    return( 
      <React.Fragment>
        <Nav></Nav>
        {
          this.state.user !== null && 
          <div>{this.printUser()}</div>
       
        }
       
        
      </React.Fragment>
    )
  }
}
