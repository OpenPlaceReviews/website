import React from "react";
import {Route, Switch} from "react-router-dom";

import Blocks from "./Blocks";

import Error404 from "../404";

export default () => {
  return <div className="container">
    <Switch>
      <Route path="/" component={Blocks}/>

      <Route path="*" component={Error404} />
    </Switch>
  </div>;
};
