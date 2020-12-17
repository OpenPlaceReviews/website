import React from 'react';
import { makeStyles } from '@material-ui/styles';

import {Box} from "@material-ui/core";
import BlockIcon from "../../assets/icons/BlockIcon";
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
  icon: {
    width: "45px",
  },
  hash: {
    fontWeight: 500,
    color: "#ACB2BF",
    "& a": {
      fontWeight: 500,
      color: "#ACB2BF",
    },
  },
  content: {
    width: "100%",
  }
});

export default ({header, footer, json, hash, icon, children}) => {
  const classes = useStyles();

  if (!icon) {
    icon = <BlockIcon/>;
  }

  return <div className={classes.item}>
    <Box display="flex" justifyContent="flex-start">
      <div className={classes.icon}>{icon}</div>
      <div className={classes.content}>
        <Box display="flex" justifyContent="space-between">
          <h2 className={classes.header}>{header}</h2>
          <div className={classes.hash}>{hash}</div>
        </Box>

        {children}
        <JSONViewer json={json} footer={footer}/>
      </div>
    </Box>
  </div>;
}

