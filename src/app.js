import React from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";

import { Route, Switch } from "react-router-dom";
import LendingLayout from "./components/LandingLayout";
import MainLayout from "./components/MainLayout";

export default () => {
  return <div>
    <Switch>
      <Route exact path={["/", "/investing"]} component={LendingLayout} />
      <Route path="*" component={MainLayout}/>
    </Switch>
  </div>;
};
