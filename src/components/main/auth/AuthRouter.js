import React from 'react';
import {Route, Switch} from "react-router-dom";
import Profile from "./Profile";
import ResetPwd from "./ResetPwd";
import AuthConfirmPage from "./AuthConfirmPage";

import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

export default function AuthRouter() {
  return <Switch>
    <Route path={"/auth"} component={AuthConfirmPage} />
    <Route path={"/login"} component={LoginPage}/>
    <Route path={"/signup"} component={SignUpPage}/>
    <Route path={"/profile"} component={Profile} />
    <Route path={"/reset-password"} component={ResetPwd} />
  </Switch>
};
