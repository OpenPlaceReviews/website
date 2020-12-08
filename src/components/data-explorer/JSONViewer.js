import React, {useState} from 'react';
import ReactJson from 'react-json-view'

import Collapse from '@material-ui/core/Collapse';
import {Grid, Link, SvgIcon} from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  arrow: {
    width: "10px",
    height: "6px",
    verticalAlign: "middle",
    marginLeft: "10px",
  },
  icon: {
    margin: "0 auto",
    width: "18px",
    height: "18px",
  },
  link: {
    fontSize: "15px",
    color: "#2D69E0",
    textDecoration: "none",
    verticalAlign: "middle",
    "&:active": {
      color: "#2D69E0",
      textDecoration: "none",
    }
  },
});

export default ({json, links, open = false}) => {
  const [isOpen, toggleOpen] = useState(open);
  const classes = useStyles();

  const onExpandClick = (e) => {
    e.preventDefault();
    toggleOpen(!isOpen);
  };

  return <Grid container>
    <Grid item xs={6}>
      <Link
        onClick={onExpandClick}
        className={classes.link}
        variant="body2"
      >
        Raw json
        <SvgIcon classes={{root: classes.arrow}} viewBox="0 0 10 6">
          <path d="M5 6L10 0H0L5 6Z" fill="#ACB2BF"/>
        </SvgIcon>
      </Link>
    </Grid>
    <Grid item xs={6}>
      {links}
    </Grid>

    <Grid item xs={12}>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <ReactJson
          src={json}
          iconStyle="triangle"
          displayObjectSize={false}
          displayDataTypes={false}
          collapseStringsAfterLength={80}
          style={{
            background: "#F2F2F2",
            border: "1px solid #CCD0D9",
            borderRadius: "5px",
            padding: "15px",
            marginTop: "10px",
          }}
        />
      </Collapse>
    </Grid>
  </Grid>
};
