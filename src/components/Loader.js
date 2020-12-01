import React from "react";
import {createUseStyles} from 'react-jss';
import { usePromiseTracker } from "react-promise-tracker";
import "../assets/images/loader.png";

const useStyles = createUseStyles({
  loader: {
    background: "url(../assets/images/loader.png) no-repeat center center",
    display: "block",
    width: "220px",
    height: "25px",
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    margin: "0 auto",
    transform: "translateY(-50%)",
  }
});

export default () => {
  const { promiseInProgress } = usePromiseTracker();
  const classes = useStyles();
  return (promiseInProgress && <i className={classes.loader}/>);
}
