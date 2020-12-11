import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import Blocks from "./Blocks";
import Block from "./Block";

import Error404 from "../404";
import {Grid} from "@material-ui/core";
import Sidebar from "./Sidebar";

import {getOperations} from "../../api/data";
import Transactions from "./Transactions";
import Transaction from "./Transaction";
import Queue from "./Queue";

export default () => {
  const [opsTypes, setOpsTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getOperations();
        setOpsTypes(responce);
      } catch (e) {
        console.warn('Network request failed ops');
      }
    }

    fetchData();
  }, []);


  return <div className="container">
    <Grid container justify="center" spacing={3}>
      <Grid item xs={9}>
        <Switch>
          <Route exact path="/data">
            <Redirect to="/data/blocks" />
          </Route>

          <Route path="/data/blocks" exact component={Blocks}/>
          <Route path="/data/blocks/:hash" exact component={Block}/>
          <Route path="/data/blocks/:blockId/transactions" exact component={Transactions}/>
          <Route path="/data/blocks/:blockId/transactions/:hash" component={Transaction}/>
          <Route path="/data/queue" component={Queue}/>

          <Route path="*" component={Error404} />
        </Switch>
      </Grid>
      <Grid item xs={3}>
        <Sidebar opsTypes={opsTypes}/>
      </Grid>
    </Grid>
  </div>;
};
