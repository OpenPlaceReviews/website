import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";

import iconNickname from "../../../../assets/images/icon-nickname.png";
import iconGoogle from "../../../../assets/images/icon-google.png";
import iconOSM from "../../../../assets/images/icon-osm.png";
import iconGithub from "../../../../assets/images/icon-github.png";

import {Box, FormHelperText, Collapse, Link} from "@material-ui/core";
import storage from "../../../../storage";

const useStyles = makeStyles({
  methodList: {
    padding: 0,
    "& li": {
      listStyleType: "none",
      maxWidth: "540px",
      borderBottom: "1px solid #E4E7ED",
    },
    "& li:last-child": {
      borderBottom: "none",
    },
    "& img": {
      height: "20px",
      margin: "15px 10px 15px 15px",
    },
    "& a, & button": {
      textTransform: "none",
      color: "#2D69E0",
      textDecoration: "none",
    },
    "& a:hover, & button:hover": {
      textDecoration: "none",
    },
  },
  header: {
    fontWeight: 600,
  },
});


export default function AuthSelector({Form, onSuccess, header, reqParams}) {
  const classes = useStyles();
  const [showForm, toggleForm] = useState(false);

  const {callback, purpose} = reqParams;
  const oauthLinksHandler = () => {
    if (callback) {
      storage.set('opr-auth-callback', {
        callback,
        purpose,
      });
    }

    return false;
  };

  return <div>
    {header && <p className={classes.header}>{header}</p>}
    <ul className={classes.methodList}>
      <li>
        <Box display="flex" alignItems="center">
          <img src={iconGoogle} alt="Google icon"/>
          <a href="/api/auth/user-oauth-auth?oauthProvider=google" onClick={oauthLinksHandler}>Google</a>
        </Box>
      </li>
      <li>
        <Box display="flex" alignItems="center">
          <img src={iconOSM} alt="OpenStreetMap icon"/>
          <a href="/api/auth/user-oauth-auth?oauthProvider=osm" onClick={oauthLinksHandler}>OpenStreetMap</a>
        </Box>
      </li>
      <li>
        <Box display="flex" alignItems="center">
          <img src={iconGithub} alt="Github icon"/>
          <a href="/api/auth/user-oauth-auth?oauthProvider=github" onClick={oauthLinksHandler}>Github</a>
        </Box>
      </li>
      <li>
        <Box display="flex" alignItems="center">
          <img src={iconNickname} alt="Nickname icon"/>
          <Link component="button" className="login-btn" onClick={() => toggleForm(true)}>
            Use nickname and password
          </Link>
        </Box>
        <FormHelperText>
          For OAuth methods you can add the nickname in the next step, but this will not completely hide your id.
        </FormHelperText>
      </li>
    </ul>

    <Collapse in={showForm} timeout="auto" unmountOnExit>
      <Form onSuccess={onSuccess}/>
    </Collapse>
  </div>;
}
