import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Signup from "./Components/Auth/Signup/Signup";
import EditInfo from "./Components/Auth/EditInfo/EditInfo";
import Song from "./Components/Song/Song";
import Login from "./Components/Auth/Login/Login";
import Profile from "./Components/Profile/Profile";
import Add from "./Components/Add/Add";

export default (
  <Switch>
    <Route path="/" component={Landing} exact />
    <Route path="/song/:id" component={Song} />
    <Route path="/profile" component={Profile} />
    <Route path="/add" component={Add} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/editInfo" component={EditInfo} />
  </Switch>
);
