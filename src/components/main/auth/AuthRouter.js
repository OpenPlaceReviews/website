import React from 'react';
import {Route, Switch} from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import ResetPwd from "./ResetPwd";
import AuthConfirm from "./AuthConfirm";

export default function AuthRouter() {
  return <Switch>
    <Route path={"/auth"} component={AuthConfirm} />
    <Route path={"/login"} component={Login}/>
    <Route path={"/signup"} component={SignUp}/>
    <Route path={"/profile"} component={Profile} />
    <Route path={"/reset-password"} component={ResetPwd} />
  </Switch>
};
