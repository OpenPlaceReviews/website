import React from "react";
import {Route, Switch} from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Profile from "./auth/Profile";
import AuthConfirm from "./auth/AuthConfirm";
import ResetPwd from "./auth/ResetPwd";
import Map from "./map/Map";

import Error404 from "./404";

export default () => {
  return <div>
    <Header />

    <Switch>
      <Route path="/login" component={Login}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route path="/profile" component={Profile} />
      <Route path="/reset-password" component={ResetPwd} />
      <Route path="/auth" component={AuthConfirm} />
      <Route path="/map" component={Map} />

      <Route path="*" component={Error404} />
    </Switch>

    <Footer />
  </div>;
};
