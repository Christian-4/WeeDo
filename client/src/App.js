import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import './App.css';
import SignupPage from "./Components/Pages/SignupPage/SignupPage.jsx"
import LoginPage from "./Components/Pages/LoginPage/LoginPage.jsx"
import PlansPage from "./Components/Pages/PlansPage/PlansPage.jsx"
import PlanPage from "./Components/Pages/PlanPage/PlanPage.jsx"
import CreatePlanPage from "./Components/Pages/CreatePlanPage/CreatePlanPage.jsx"
import MyProfilePage from "./Components/Pages/MyProfilePage/MyProfilePage.jsx"
import ProfilePage from "./Components/Pages/ProfilePage/ProfilePage.jsx"
import ChatsPage from "./Components/Pages/ChatsPage/ChatsPage.jsx"
import ChatPage from "./Components/Pages/ChatPage/ChatPage.jsx"
import Home from "./Components/Pages/HomePage/HomePage.jsx"
import FriendsPage from "./Components/Pages/FriendsPage/FriendsPage.jsx"
import UserPage from "./Components/Pages/UserPage/UserPage.jsx"
import NotificationsPage from './Components/Pages/NotificationsPage/NotificationsPage.jsx';
import FavouritesPage from './Components/Pages/FavouritesPage/FavouritesPage';
import PlansToGoPage from './Components/Pages/PlansToGoPage/PlansToGoPage';
import OwnPlansPage from './Components/Pages/OwnPlansPage/OwnPlansPage';
import FriendsPlansPage from './Components/Pages/FriendsPlansPage/FriendsPlansPage';
import Tapbar from './Components/Tapbar/Tapbar';
import NotificationsPlanPage from './Components/Pages/NotificationsPlanPage/NotificationsPlanPage';
import ParticipantsPage from './Components/Pages/ParticipantsPage/ParticipantsPage';
import PlanMap from "./Components/Pages/PlanMap/PlanMap.jsx"
import IndividualChat from "./Components/Pages/IndividualChat/IndividualChat.jsx"
import PlansMap from "./Components/Pages/PlansMap/PlansMap.jsx"
import FilterPlans from "./Components/Pages/FilterPlans/FilterPlans.jsx"
import ConfigureProfile from "./Components/Pages/ConfigureProfile/ConfigureProfile.jsx"
import BasicData from "./Components/Pages/BasicData/BasicData.jsx"
import ConfigureHobbies from "./Components/Pages/ConfigureHobbies/ConfigureHobbies.jsx"
import InitialPage from "./Components/Pages/InitialPage/InitialPage.jsx"
import SendPlanPage from "./Components/Pages/SendPlanPage/SendPlanPage.jsx"


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userSession: null,
      userSessionId: null
    }

    this.IsredirectHome = false


  }

  getUserSession = (user) => {
    this.setState({ ...this.state, userSession: user, userSessionId: user })

  }


  redirectHome = () => {
    return <Redirect to='/plans' />
  }






  render() {
    console.log(window.location.href)
    return (


      <div className="App">

        {
          this.state.userSessionId !== null &&
          this.redirectHome()

        }

        <Switch>
          {/* <Route exact path="/" render={() => <Home userSessionId = {this.state.userSessionId}/>} /> */}
          <Route exact path="/signup" render={() => <SignupPage />} />
          <Route exact path="/" render={() => <InitialPage />} />
          <Route exact path="/login" render={() => <LoginPage getUserSession={this.getUserSession} />} />
          <Route exact path="/plans" render={props => <PlansPage filters={props.location.filters} />} />
          <Route exact path="/plan/:id" component={PlanPage} />
          <Route exact path="/newplan" render={() => <CreatePlanPage />} />
          <Route exact path="/profile" render={() => <MyProfilePage />} />
          <Route exact path="/profile/:id" component={ProfilePage} />
          <Route exact path="/chats" render={() => <ChatsPage />} />
          <Route exact path="/chat/:id" component={ChatPage} />
          <Route exact path="/individualchat/:id" component={IndividualChat} />
          <Route exact path="/friends" render={() => <FriendsPage />} />
          <Route exact path="/allusers" render={() => <UserPage />} />
          <Route exact path="/notifications" render={() => <NotificationsPage />} />
          <Route exact path="/favourites" render={() => <FavouritesPage />} />
          <Route exact path="/plansgo" render={() => <PlansToGoPage />} />
          <Route exact path="/ownplans" render={() => <OwnPlansPage />} />
          <Route exact path="/friendsplans" render={() => <FriendsPlansPage />} />
          <Route exact path="/notifications/:id" component={NotificationsPlanPage} />
          <Route exact path="/participants/:id" component={ParticipantsPage} />
          <Route exact path="/planmap/:id" component={PlanMap}/>
          <Route exact path="/plansmap" render={() => <PlansMap />}/>
          <Route exact path="/filterPlans" render={() => <FilterPlans />}/>
          <Route exact path="/configureProfile" render={props => <ConfigureProfile user={props.location.user} />}/>
          <Route exact path="/basicData" render={props => <BasicData  user={props.location.user}/>}/>
          <Route exact path="/configureHobbies" render = {props => <ConfigureHobbies user={props.location.user}/>}/>
          <Route exact path="/sendPlanPage/:id" component={SendPlanPage}/>
          
        </Switch>

        {window.location.href !== `${process.env.REACT_APP_API_URL2}/` && window.location.href !== `${process.env.REACT_APP_API_URL2}/login` && window.location.href !== `${process.env.REACT_APP_API_URL2}/signup` ?
          <Tapbar></Tapbar>
          : ""
        }
      </div>
    );
  }
}

export default App;
