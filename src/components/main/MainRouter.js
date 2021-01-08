import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";

import AuthLayout from "./auth/AuthLayout";
import BlockchainLayout from "./blockchain/BlockchainLayout";
import Error404 from "./Error404";

export default function MainRouter() {
  let { path } = useRouteMatch();

  let authRoutes = [
    `${path}/auth`,
    `${path}/login`,
    `${path}/signup`,
    `${path}/profile`,
    `${path}/reset-password`,
  ]

  return <Switch>
    <Route exact path={authRoutes} component={AuthLayout} />
    <Route path={`${path}/data`} component={BlockchainLayout} />

    <Route path="*" component={Error404} />
  </Switch>
}
