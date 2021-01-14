import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  value: {
    fontWeight: props => props.fontWeight,
    color: "#000",
    fontSize: "15px",
  }
});

export default function Value({children, listItem}) {
  const props = {
    fontWeight: listItem ? "bold" : "normal",
  }

  const classes = useStyles(props);
  return <span className={classes.value}>{children}</span>
};
