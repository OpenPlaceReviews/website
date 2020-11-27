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
import DataRouter from "./data-explorer/DataRouter";

import Error404 from "./404";

export default () => {
  return <div className="main-container">
    <Header />

    <div className="main-content">
      <Switch>
        <Route path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route path="/profile" component={Profile} />
        <Route path="/reset-password" component={ResetPwd} />
        <Route path="/auth" component={AuthConfirm} />

        <Route path="/map" component={Map} />
        <Route path="/data" component={DataRouter} />

        <Route path="*" component={Error404} />
      </Switch>
    </div>

    <Footer />
  </div>;
};
