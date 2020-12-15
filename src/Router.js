import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LendingLayout from "./components/landing/LandingLayout";
import MainLayout from "./components/main/MainLayout";

export default function Router() {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LendingLayout}/>
      <Route path="*" component={MainLayout}/>
    </Switch>
  </BrowserRouter>;
};
