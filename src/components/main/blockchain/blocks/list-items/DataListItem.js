import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';

import {Box} from "@material-ui/core";
import JSONViewer from "../JSONViewer/JSONViewer";
import {Link} from "react-router-dom";
import Value from "../Value";
import ExpandBtn from "../JSONViewer/ExpandBtn";

const useStyles = makeStyles({
  item: {
    color: "#6A7181",
    borderBottom: "1px solid #E4E8F2",
    padding: "15px",
    fontSize: "15px",
    "& p": {
      fontWeight: "normal",
      margin: "5px 0",
    },
  },
  header: {
    fontWeight: 600,
    fontSize: "16px",
    margin: 0,
  },
  icon: {
    margin: "0 auto",
    width: "18px",
    height: "18px",
  },
  hash: {
    fontWeight: 500,
    fontSize: "15px",
    color: "#ACB2BF",
    "& a": {
      fontSize: "15px",
      fontWeight: 500,
      color: "#ACB2BF",
    },
  },
  content: {
    width: "100%",
    marginLeft: "35px",
  },
  link: {
    fontFamily: "IBM Plex Sans",
    fontWeight: 600,
    fontSize: "16px",
    color: "#2D69E0",
    textDecoration: "none",
    verticalAlign: "middle",
    "&:active": {
      color: "#2D69E0",
      textDecoration: "none",
    }
  },
});

export default ({link, block, title, icon, signedBy, shortId, children}) => {
  const [jsonOpen, expandJson] = useState(false);
  const classes = useStyles();

  const onExpandClick = (e) => {
    e.preventDefault();
    expandJson(!jsonOpen);
  };

  return <div className={classes.item}>
    <Box display="flex" justifyContent="flex-start">
      <div className={classes.icon}>
        {icon}
      </div>
      <div className={classes.content}>
        <Box display="flex" justifyContent="space-between">
          <h2 className={classes.header}>
            <Link to={link} className={classes.link}>{title}</Link>
          </h2>
          <div className={classes.hash}>
            <Link to={link} className={classes.link}>{shortId}</Link>
          </div>
        </Box>

        {children}

        <Box display="flex" justifyContent="space-between">
          <ExpandBtn onClick={onExpandClick}/>
          {signedBy && <div>Signed by: <Value>{signedBy}</Value></div>}
        </Box>

        <JSONViewer open={jsonOpen} json={block}/>
      </div>
    </Box>
  </div>;
}

