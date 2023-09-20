import React from "react";
import UserSignUpPage from "../pages/UserSignUpPage";
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import TopBar from "../components/TopBar";


class App extends React.Component {

  state = {
    isLoggedIn: false,
    username: undefined
}

onLoginSuccess = (username) => {
  console.log("username: ", username);
  this.setState({
    username,
    isLoggedIn: true
  });
};

onLogoutSuccess = () => {
  this.setState({
    isLoggedIn: false,
    username: undefined
  })
}

  render(){

    const { isLoggedIn, username } = this.state;

    return (
      <div>
        <Router>
        <TopBar username={username} isLoggedIn={isLoggedIn} onLogoutSuccess={this.onLogoutSuccess}></TopBar>
        <Switch>
        <Route exact path="/" component={HomePage}></Route>
        {!isLoggedIn && <Route path="/login" component={(props) => {
          return <LoginPage {... props} onLoginSuccess={this.onLoginSuccess} onLogoutSuccess={this.onLogoutSuccess}></LoginPage>
        }}></Route>}
        <Route path="/signup" component={UserSignUpPage}></Route>
        <Route path="/user/:username" component={props => {
          return <UserPage {...props} username={username} ></UserPage>
        }}></Route>
        <Redirect to="/"></Redirect>
        </Switch>
        </Router>
      </div>
    
      );

  }
}

export default App;
