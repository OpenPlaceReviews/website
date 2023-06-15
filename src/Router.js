import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingLayout from "./components/landing/LandingLayout";
import DiscontinuedLayout from "./components/landing/DiscontinuedLayout";
import MainLayout from "./components/main/MainLayout";
import MapLayout from "./components/map/MapLayout";

export default function Router() {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={DiscontinuedLayout}/>
      <Route exact path="/intro" component={LandingLayout} />
      <Route path="/map" component={MapLayout}/>
      <Route path="*" component={MainLayout}/>
    </Switch>
  </BrowserRouter>;
};
