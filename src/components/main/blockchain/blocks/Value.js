import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  value: {
    color: "#000",
  }
})

export default function Value({children}) {
  const classes = useStyles();
  return <span className={classes.value}>{children}</span>
};
