import React from "react";
import {createUseStyles} from 'react-jss';
import loaderImg from "../../../assets/images/loader.png";

const useStyles = createUseStyles({
  loader: {
    background: `url(${loaderImg}) no-repeat center center`,
    display: "block",
    width: "220px",
    height: "25px",
    position: "fixed",
    top: "50%",
    left: 0,
    right: 0,
    margin: "0 auto",
    transform: "translateY(-50%)",
  }
});

export default () => {
  const classes = useStyles();
  return <i className={classes.loader}/>;
}
