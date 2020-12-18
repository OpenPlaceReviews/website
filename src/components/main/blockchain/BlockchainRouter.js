import React from "react";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";

import BlocksPage from "./BlocksPage";
import BlockPage from "./BlockPage";
import Transactions from "./TransactionsPage";
import QueuePage from "./QueuePage";

export default () => {
  let {path, url} = useRouteMatch();

  return <Switch>
    <Route exact path={path}>
      <Redirect to={`${url}/blocks`}/>
    </Route>

    <Route path={`${path}/blocks`} exact component={BlocksPage}/>
    <Route path={`${path}/blocks/:param`} exact component={BlockPage}/>
    <Route path={`${path}/blocks/:param/transactions`} exact component={Transactions}/>
    <Route path={`${path}/blocks/:param/transactions/:hash`} exact component={Transactions}/>
    <Route path={`${path}/queue`} component={QueuePage}/>
  </Switch>;
};
