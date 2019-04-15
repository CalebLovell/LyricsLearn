import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Signup from "./Components/Signup/Signup";
import Song from "./Components/Song/Song";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import Add from "./Components/Add/Add";

export default (
  <Switch>
    <Route path="/" component={Landing} exact />
    <Route path="/song" component={Song} />
    <Route path="/profile" component={Profile} />
    <Route path="/add" component={Add} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
  </Switch>
);
