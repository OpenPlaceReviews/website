import React, {useContext} from 'react';
import {Redirect} from "react-router-dom";

import {UserContext} from "../../context";
import EmailConfirmation from "./EmailConfirmation";

export default () => {
  const {authData, authStatus, logIn} = useContext(UserContext);

  if (!authData.name) {
    return <Redirect to={"/login"}/>;
  }

  if (!authStatus) {
    return <div className="auth-container" id="opr-app">
      <p>Checking status...</p>
    </div>;
  }

  const { 'db-name': name, 'email-expired': emailExpired, email, blockchain} = authStatus;
  if (name !== 'ok') {
    if (blockchain !== 'ok') {
      return <Redirect to={"/signup"}/>;
    } else {
      return <Redirect to={"/login"}/>;
    }
  } else {
    if (blockchain !== 'ok') {
      if (email === 'ok' && emailExpired !== true) {
        return <EmailConfirmation params={{name: authData.name}} onSuccess={logIn}/>;
      } else {
        return <Redirect to={"/signup"}/>;
      }
    } else {
      if (!authData.token) {
        return <Redirect to={"/login"}/>;
      }
    }
  }

  return <div className="auth-container" id="opr-app">
    <h1>
      <div className="oauth_avatar">
        <img src="../../assets/images/avatar-default.png" alt="Default avatar"/>
      </div>
      Welcome, { authData.name }!
    </h1>

    <p>Start contributing to OpenPlaceReviews.</p>
    <p>Please visit <a href="/map.html">map</a> to find places to contribute.</p>
  </div>;
};
