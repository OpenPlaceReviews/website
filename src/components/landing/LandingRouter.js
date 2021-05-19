import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";

import LandingPage from "./LandingPage";

export default function LandingRouter () {
  let { path } = useRouteMatch();

  return <Switch>
    <Route path={path} component={LandingPage} />
  </Switch>
};
