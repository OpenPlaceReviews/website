import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";

import LendingPage from "./LendingPage";

export default function LandingRouter () {
  let { path } = useRouteMatch();

  return <Switch>
    <Route path={path} component={LendingPage} />
  </Switch>
};
