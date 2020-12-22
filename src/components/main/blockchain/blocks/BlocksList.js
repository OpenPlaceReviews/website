import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  list: {
    borderTop: "1px solid #E4E8F2",
    position: "relative",
    minHeight: "200px",
    paddingBottom: "20px",
    marginBottom: "20px",
  },
});

export default function BlocksList({children}) {
  const classes = useStyles();
  return <div className={classes.list}>{children}</div>;
}
