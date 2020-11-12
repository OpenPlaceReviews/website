import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";

import {UserContext} from "../../context";
import EmailConfirmation from "./EmailConfirmation";
import auth from "../../api/auth";

export default () => {
  const {authData, logIn} = useContext(UserContext);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await auth.checkName(authData.name);
      if (!data) return;

      setStatus(data);
    };

    fetchData();
  }, [authData]);

  if (!authData.name) {
    return <Redirect to={"/login"}/>;
  }

  if (!status) {
    return <div className="auth-container" id="opr-app">
      <div className="loader">Loading...</div>
    </div>;
  }

  const { 'db-name': name, 'email-expired': emailExpired, email, blockchain} = status;
  if (name !== 'ok') {
    if (blockchain !== 'ok') {
      return <Redirect to={"/signup"}/>;
    } else {
      return <Redirect to={"/login"}/>;
    }
  } else {
    if (blockchain !== 'ok') {
      if (email === 'ok' && emailExpired !== "true") {
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
