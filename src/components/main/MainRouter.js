import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";

import AuthRouter from "./auth/AuthRouter";
import Map from "./map/Map";
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
    <Route exact path={authRoutes} component={AuthRouter} />
    <Route path={`${path}/map`} component={Map} />
    <Route path={`${path}/data`} component={BlockchainLayout} />

    <Route path="*" component={Error404} />
  </Switch>
}
