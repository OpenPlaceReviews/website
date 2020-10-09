import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Lending from "./components/Lending";
import Investing from "./components/Investing";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Profile from "./components/auth/Profile";

export default () => {
  return <div>
    <Switch>
      <Route exact path="/" component={Lending} />
      <Route path="/investing" component={Investing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" component={Profile} />
    </Switch>
  </div>;
};
