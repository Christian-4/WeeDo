import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import PrincipalPage from "./Components/Pages/PrincipalPage/PrincipalPage.jsx"
import SignupPage from "./Components/Pages/SignupPage/SignupPage.jsx"
import LoginPage from "./Components/Pages/LoginPage/LoginPage.jsx"
import PlansPage from "./Components/Pages/PlansPage/PlansPage.jsx"
import PlanPage from "./Components/Pages/PlanPage/PlanPage.jsx"
import CreatePlanPage from "./Components/Pages/CreatePlanPage/CreatePlanPage.jsx"
import ProfilePage from "./Components/Pages/ProfilePage/ProfilePage.jsx"
import ChatsPage from "./Components/Pages/ChatsPage/ChatsPage.jsx"
import ChatPage from "./Components/Pages/ChatPage/ChatPage.jsx"
import Home from "./Components/Pages/HomePage/HomePage.jsx"


class App extends Component {
  render() {
    return (

   
     
      <div className="App">
         
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/signup" render={() => <SignupPage />} />
          <Route exact path="/login" render={() => <LoginPage />} />
          <Route exact path="/plans" render={() => <PlansPage />} />
          <Route exact path="/plan/:_id" render={() => <PlanPage />} />
          <Route exact path="/newplan" render={() => <CreatePlanPage />} />
          <Route exact path="/profile/:_id" render={() => <ProfilePage />} />
          <Route exact path="/chats" render={() => <ChatsPage />} />
          <Route exact path="/chat/:_id" render={() => <ChatPage />} />
          
        </Switch>
      </div>
    );
  }
}

export default App;
