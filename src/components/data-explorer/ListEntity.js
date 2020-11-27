import React from 'react';
import {makeStyles} from "@material-ui/styles";

import Loader from "../Loader";

const useStyles = makeStyles({
  list: {
    borderTop: "1px solid #E4E8F2",
    position: "relative",
    minHeight: "200px",
    paddingBottom: "20px",
  },
});

export default ({Component, data, keyName}) => {
  const classes = useStyles();

  let content;
  if (data === null) {
    content = <Loader/>;
  } else if (data.length) {
    content = data.map((entity) => <Component key={entity[keyName]} entity={entity}/>)
  } else {
    content = "No entities available"
  }

  return <div className={classes.list}>
    {content}
  </div>;
};
