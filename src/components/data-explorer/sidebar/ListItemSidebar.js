import React from 'react';
import {makeStyles} from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles({
  root: {
    paddingTop: "5px",
    paddingBottom: "5px",
  },
});

export default ({children, ...bypass}) => {
  const classes = useStyles();

  return <ListItem {...bypass} className={classes.root}>
    {children}
  </ListItem>;
}
