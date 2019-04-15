import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Switch } from "react-router-dom";
import Header from "./Components/Header/Header";
import Landing from "./Components/Landing/Landing";
import Signup from "./Components/Signup/Signup";
import Song from "./Components/Song/Song";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import Add from "./Components/Add/Add";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <Header />
          <Switch>
            <Landing path="/" Component={Landing} exact/>
            <Song path="/song" Component={Song} />
            <Profile path="/profile" Component={Profile} />
            <Add path="/add" Component={Add} />
            <Signup path="/signup" Component={Signup} />
            <Login path="/login" Component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
