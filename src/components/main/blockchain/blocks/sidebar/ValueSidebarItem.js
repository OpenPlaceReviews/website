import React from 'react';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    color: "#ACB2BF",
  }
});

export default function ValueSidebarItem({value}) {
  const classes = useStyles();

  return <ListItemSecondaryAction className={classes.root}>{value}</ListItemSecondaryAction>
}
