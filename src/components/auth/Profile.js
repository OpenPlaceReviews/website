import React, {useContext, useEffect} from 'react';
import {useHistory} from "react-router-dom";

import {UserContext} from "../../context";
import auth from "../../api/auth";

export default () => {
  const {authData, logIn} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await auth.checkName(authData.name);
      if (!data) return;

      const { 'db-name': name, 'email-expired': emailExpired, email, blockchain} = data;

      if (name !== 'ok') {
        if (blockchain !== 'ok') {
          history.push('/signup');
        } else {
          history.push('/login');
        }
      } else {
        if (blockchain !== 'ok') {
          if (email === 'ok' && emailExpired !== 'ok') {
            logIn({
              ...authData,
              isVerified: false,
            });
          } else {
            history.push('/signup');
          }
        } else {
          if (!authData.token) {
            history.push('/login');
          }
        }
      }
    };

    if (authData.name) {
      fetchData();
    }
  }, [authData]);

  if (!authData.name) {
    history.push('/login');
  }

  if (!authData.token) {
    if (!authData.isVerified) {
      return <div className="auth-container" id="opr-app">
        <p>Please check your email to confirm account.</p>
      </div>;
    } else {
      history.push('/login');
      return;
    }
  }

  return <div className="auth-container" id="opr-app">
    <h1>
      <div className="oauth_avatar">
        <img src="../../assets/images/avatar-default.png" alt="Default avatar"/>
      </div>
      Welcome, { authData.name }!
    </h1>

    <p>tart contributing to OpenPlaceReviews.</p>
    <p>Please visit <a href="/map.html">map</a> to find places to contribute.</p>
  </div>;
};
