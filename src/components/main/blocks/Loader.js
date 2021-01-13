import React from "react";
import {createUseStyles} from 'react-jss';
import loaderImg from "../../../assets/images/loader.png";

const useStyles = createUseStyles({
  loader: (props) => {
    const style = {
      background: `url(${loaderImg}) no-repeat center center`,
      display: "block",
      width: "220px",
      height: "25px",
      position: "fixed",
      margin: "0 auto",
    };

    if (props.position) {
      style.position = props.position;
    }

    if (props.position === 'relative') {
      style.margin = "20px auto";
    } else {
      style.transform = "translateY(-50%)";
      style.top = "50%";
      style.left = 0;
      style.right = 0;
    }

    return style;
  }
});

export default function Loader({position = ''}) {
  const classes = useStyles({position});
  return <i className={classes.loader}/>;
}
