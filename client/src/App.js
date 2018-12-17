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

class App extends Component {

  constructor() {
    super();

    this.state = {
      userSession: null,
      userSessionId: null
    }

    this.IsredirectHome = false
    

  }

  getUserSession = (user) => {
   this.setState({...this.state, userSession: user, userSessionId: user})

  }


  redirectHome = () => {
    return  <Redirect to='/' />
  } 

  




  render() {
    return (
      
     
      <div className="App">

        {
           this.state.userSessionId !== null && 
           this.redirectHome()
     
        }

        <Switch>
          <Route exact path="/" render={() => <Home userSessionId = {this.state.userSessionId}/>} />
          <Route exact path="/signup" render={() => <SignupPage />} />
          <Route exact path="/login" render={() => <LoginPage  getUserSession = {this.getUserSession}/>} />
          <Route exact path="/plans" render={() => <PlansPage />} />
          <Route exact path="/plan/:id" component={PlanPage} />
          <Route exact path="/newplan" render={() => <CreatePlanPage />} />
          <Route exact path="/profile"render={() => <MyProfilePage />} />
          <Route exact path="/profile/:id" component={ProfilePage} />
          <Route exact path="/chats" render={() => <ChatsPage />} />
          <Route exact path="/chat/:id" component={ChatPage} />
          <Route exact path="/friends" render={() => <FriendsPage />} />
          <Route exact path="/allusers" render={() => <UserPage />} />
          <Route exact path="/notifications" render={() => <NotificationsPage />} />
          <Route exact path="/favourites" render={() => <FavouritesPage />} />
          <Route exact path="/plansgo" render={() => <PlansToGoPage />} />
          <Route exact path="/ownplans" render={() => <OwnPlansPage />} />
          <Route exact path="/friendsplans" render={() => <FriendsPlansPage />} />
        </Switch>

      </div>
    );
  }
}

export default App;
