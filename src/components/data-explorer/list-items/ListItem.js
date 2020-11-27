import React from 'react';
import { makeStyles } from '@material-ui/styles';

import {Grid} from "@material-ui/core";
import BlockSvgIcon from "./BlockSvgIcon";
import JSONViewer from "../JSONViewer";

const useStyles = makeStyles({
  item: {
    color: "#6A7181",
    borderBottom: "1px solid #E4E8F2",
    padding: "15px",
    "& p": {
      margin: "5px 0",
    }
  }
  ,
  header: {
    fontWeight: 600,
    fontSize: "16px",
    margin: 0,
  },
  twoColumn: {
    display: "flex",
    justifyContent: "space-between",
  },
  hash: {
    fontWeight: 500,
    color: "#ACB2BF",
  },
});

export default ({header, footer, json, hash, icon, children}) => {
  const classes = useStyles();

  let smallHash = '';
  if (hash.includes(":")) {
    const hashPart = hash.split(":").pop();
    smallHash = hashPart.substring(0, 16);
  }

  if (!icon) {
    icon = <BlockSvgIcon/>;
  }

  return <div className={classes.item}>
    <Grid container>
      <Grid item xs={1}>
        <div className={classes.icon}>{icon}</div>
      </Grid>
      <Grid item xs={11}>
        <div className={classes.twoColumn}>
          <h2 className={classes.header}>{header}</h2>
          <div className={classes.hash}>{smallHash}</div>
        </div>

        {children}
        <JSONViewer json={json} footer={footer}/>
      </Grid>
    </Grid>
  </div>;
}

