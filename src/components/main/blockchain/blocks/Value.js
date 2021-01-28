import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  value: {
    fontWeight: props => props.listItem ? "bold" : "normal",
    color: props => props.color ? props.color : "#000",
    fontSize: "15px",
  }
});

export default function Value({children, listItem, color}) {
  const classes = useStyles({listItem, color});
  return <span className={classes.value}>{children}</span>
};
