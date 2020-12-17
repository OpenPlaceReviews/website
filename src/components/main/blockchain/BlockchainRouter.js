import React from "react";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";

import BlocksPage from "./BlocksPage";
import BlockPage from "./BlockPage";
import Transactions from "./TransactionsPage";
import Transaction from "./TransactionPage";
import QueuePage from "./QueuePage";

export default () => {
  let {path, url} = useRouteMatch();

  return <Switch>
    <Route exact path={path}>
      <Redirect to={`${url}/blocks`}/>
    </Route>

    <Route path={`${path}/blocks`} exact component={BlocksPage}/>
    <Route path={`${path}/blocks/:hash`} exact component={BlockPage}/>
    <Route path={`${path}/blocks/:blockId/transactions`} exact component={Transactions}/>
    <Route path={`${path}/blocks/:blockId/transactions/:hash`} component={Transaction}/>
    <Route path={`${path}/queue`} component={QueuePage}/>
  </Switch>;
};
