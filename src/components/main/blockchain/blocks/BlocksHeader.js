import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  header: {
    marginBottom: "20px",
    fontSize: "40px",
    letterSpacing: "0.01em",
  },
});

export default function BlocksHeader({children}) {
  const classes = useStyles();
  return <h1 className={classes.header}>{children}</h1>;
}
