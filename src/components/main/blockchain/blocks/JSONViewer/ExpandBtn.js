import React from 'react';
import {SvgIcon, Link} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  arrow: {
    width: "10px",
    height: "6px",
    verticalAlign: "middle",
    marginLeft: "10px",
  },
  link: {
    color: "#2D69E0",
    textDecoration: "none",
    verticalAlign: "middle",
    "&:active": {
      color: "#2D69E0",
      textDecoration: "none",
    }
  },
});

export default function ExpandBtn({onClick}) {
  const classes = useStyles();

  return <Link onClick={onClick} component="button" className={classes.link} variant="body2">
    Raw json
    <SvgIcon classes={{root: classes.arrow}} viewBox="0 0 10 6">
      <path d="M5 6L10 0H0L5 6Z" fill="#ACB2BF"/>
    </SvgIcon>
  </Link>;
}
