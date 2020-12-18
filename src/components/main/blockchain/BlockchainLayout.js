import React from 'react';
import {Grid} from "@material-ui/core";

import Sidebar from "./blocks/sidebar/Sidebar";
import BlockchainRouter from "./BlockchainRouter";
import OperationsProvider from "./providers/OperationsProvider";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  mainColumn: {
    paddingBottom: "20px",
  }
})

export default function BlockchainLayout() {
  const classes = useStyles();
  return <OperationsProvider>
    <Grid container justify="center" spacing={3}>
      <Grid item xs={9} className={classes.mainColumn}>
        <BlockchainRouter/>
      </Grid>
      <Grid item xs={3}>
        <Sidebar/>
      </Grid>
    </Grid>
  </OperationsProvider>;
};
