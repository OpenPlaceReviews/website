import React, {useContext, useEffect} from 'react';
import {useHistory} from "react-router-dom";

import {UserContext} from "../../context";
import auth from "../../api/auth";

export default () => {
  const {authData, authStatus, updateStatus} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await auth.checkName(authData.name);
      if (!data) return;

      updateStatus(data);
    };

    if (authData.name) {
      fetchData();
    }
  }, []);

  if (!authData.name) {
    history.push('/login');
    return null;
  }

  if (!authStatus) {
    return <div className="auth-container" id="opr-app">
      <p>Checking status...</p>
    </div>;
  }

  const { 'db-name': name, 'email-expired': emailExpired, email, blockchain} = authStatus;
  if (name !== 'ok') {
    if (blockchain !== 'ok') {
      history.push('/signup');
      return null;
    } else {
      history.push('/login');
      return null;
    }
  } else {
    if (blockchain !== 'ok') {
      if (email === 'ok' && emailExpired !== false) {
        return <div className="auth-container" id="opr-app">
          <p>Please check your email to confirm account.</p>
        </div>;
      } else {
        history.push('/signup');
        return null;
      }
    } else {
      if (!authData.token) {
        history.push('/login');
        return null;
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
