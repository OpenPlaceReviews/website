import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  sidebar: {
    border: "1px solid #CCD0D9",
    textAlign: "center",
  },
});

export default () => {
  const classes = useStyles();
  return <div className={classes.sidebar}>
    Sidebar here
  </div>;
}
