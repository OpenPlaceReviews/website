import React from "react";
import { Route, Switch } from "react-router-dom";
import "core-js/stable";
import "regenerator-runtime/runtime";

import AuthProvider from "./providers/AuthProvider";
import LendingLayout from "./components/LandingLayout";
import MainLayout from "./components/MainLayout";

export default () => {
  return <AuthProvider>
    <Switch>
      <Route exact path={["/", "/investing"]} component={LendingLayout}/>
      <Route path="*" component={MainLayout}/>
    </Switch>
  </AuthProvider>;
};
