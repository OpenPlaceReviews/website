import React from 'react';
import {makeStyles} from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles({
  root: {
    padding: "5px 10px 5px 10px",
  },
});

export default function ListItemSidebar({children, ...bypass}) {
  const classes = useStyles();

  return <ListItem {...bypass} className={classes.root}>
    {children}
  </ListItem>;
}
