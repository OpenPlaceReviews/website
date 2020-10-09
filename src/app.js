import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Lending from "./components/Lending";
import Investing from "./components/Investing";

export default () => {
  return <div>
    <Switch>
      <Route exact path="/" component={Lending} />
      <Route path="/investing" component={Investing} />
    </Switch>
  </div>;
};
