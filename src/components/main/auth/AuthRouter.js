import React from 'react';
import {Route, Switch} from "react-router-dom";
import Profile from "./Profile";
import ResetPwd from "./ResetPwd";
import AuthConfirm from "./AuthConfirm";

import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

export default function AuthRouter() {
  return <Switch>
    <Route path={"/auth"} component={AuthConfirm} />
    <Route path={"/login"} component={LoginPage}/>
    <Route path={"/signup"} component={SignUpPage}/>
    <Route path={"/profile"} component={Profile} />
    <Route path={"/reset-password"} component={ResetPwd} />
  </Switch>
};
