import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  Selection: {
    color: "#2D69E0",
  }
})

export default function Selection({children}) {
  const classes = useStyles();
  return <span className={classes.value}>{children}</span>
};
