import React from "react";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";

import BlocksPage from "./BlocksPage";
import BlockPage from "./BlockPage";
import Transactions from "./TransactionsPage";
import Transaction from "./TransactionPage";
import QueuePage from "./QueuePage";
import Error404 from "../Error404";

export default function BlockChainRouter() {
  let {path, url} = useRouteMatch();

  return <Switch>
    <Route exact path={path}>
      <Redirect to={`${url}/blocks`}/>
    </Route>

    <Route path={`${path}/blocks`} exact component={BlocksPage}/>
    <Route path={`${path}/block/:param`} exact component={BlockPage}/>
    <Route path={`${path}/block/:param/transactions`} exact component={Transactions}/>
    <Route path={`${path}/block/:param/transaction/:hash`} exact component={Transaction}/>
    <Route path={`${path}/queue`} component={QueuePage}/>
    <Route path={`${path}/*`} component={Error404}/>
  </Switch>;
};
