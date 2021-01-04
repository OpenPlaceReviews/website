import React from "react";
import {createUseStyles} from 'react-jss';
import loaderImg from "../../../assets/images/loader.png";

const useStyles = createUseStyles({
  loader: {
    background: `url(${loaderImg}) no-repeat center center`,
    display: "block",
    width: "220px",
    height: "25px",
    position: (props) => props.global ? 'fixed' : 'absolute',
    top: "50%",
    left: 0,
    right: 0,
    margin: "0 auto",
    transform: "translateY(-50%)",
  }
});

export default function Loader({global = true}) {
  const classes = useStyles({global});
  return <i className={classes.loader}/>;
}
