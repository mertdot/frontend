import React from "react";
import UserSignUpPage from "../pages/UserSignUpPage";
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import TopBar from "../components/TopBar";
import { connect } from "react-redux";

class App extends React.Component {

  render(){
    const {isLoggedIn} = this.props;
    return (
      <div>
        <Router>
        <TopBar></TopBar>
        <Switch>
        <Route exact path="/" component={HomePage}></Route>
        {!isLoggedIn && <Route path="/login" component={LoginPage}></Route>}
        <Route path="/signup" component={UserSignUpPage}></Route>
        <Route path="/user/:username" component={UserPage}></Route>
        <Redirect to="/"></Redirect>
        </Switch>
        </Router>
      </div>
    
      );

  }
}

const mapStateToProps = (store) => {
  return{
      isLoggedIn: store.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
