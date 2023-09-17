import React from "react";
import UserSignUpPage from "../pages/UserSignUpPage";
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import TopBar from "../components/TopBar";


function App() {
  return (
  <div>
    <Router>
    <TopBar></TopBar>
    <Switch>
    <Route exact path="/" component={HomePage}></Route>
    <Route path="/login" component={LoginPage}></Route>
    <Route path="/signup" component={UserSignUpPage}></Route>
    <Route path="/user/:username" component={UserPage}></Route>
    <Redirect to="/"></Redirect>
    </Switch>
    </Router>
  </div>



  );
}

export default App;
