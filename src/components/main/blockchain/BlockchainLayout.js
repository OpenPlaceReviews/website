import React from 'react';
import {Grid} from "@material-ui/core";

import Sidebar from "./blocks/sidebar/Sidebar";
import BlockchainRouter from "./BlockchainRouter";
import OperationsProvider from "./providers/OperationsProvider";

export default function BlockchainLayout() {
  return <OperationsProvider>
    <Grid container justify="center" spacing={3}>
      <Grid item xs={9}>
        <BlockchainRouter/>
      </Grid>
      <Grid item xs={3}>
        <Sidebar/>
      </Grid>
    </Grid>
  </OperationsProvider>;
};
