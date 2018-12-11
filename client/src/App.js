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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" render={() => <PrincipalPage />} />
          <Route path="/signup" render={() => <SignupPage />} />
          <Route path="/login" render={() => <LoginPage />} />
          <Route path="/plans" render={() => <PlansPage />} />
          <Route path="/plan/:_id" render={() => <PlanPage />} />
          <Route path="/newplan" render={() => <CreatePlanPage />} />
          <Route path="/profile/:_id" render={() => <ProfilePage />} />
          <Route path="/chats" render={() => <ChatsPage />} />
          <Route path="/chat/:_id" render={() => <ChatPage />} />
        </Switch>
      </div>
    );
  }
}

export default App;
