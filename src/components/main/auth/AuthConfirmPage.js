import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import qs from "qs";

import storage from "../../../libs/cookies";

import AuthContext from "./providers/AuthContext";

import EmailConfirmation from "./EmailConfirmation";
import ResetPwdConfirmation from "./ResetPwdConfirmation";
import OAuthConfirmation from "./OAuthConfirmation";
import useAuthCallback from "./hooks/useAuthCallback";

export default ({location}) => {
  const {authData, logIn, signUp} = useContext(AuthContext);
  const reqParams = qs.parse(location.search.substring(1));
  const isConfirmation = (reqParams.name && reqParams.token && reqParams.op);
  const isOAuth = (reqParams.oauth_token || reqParams.oauth_verifier || reqParams.code);
  const {callback} = storage.get('opr-auth-callback') || {};
  console.log(reqParams);
  console.log(authData);
  console.log(callback);

  if (!!authData.token) {
    console.log('authData.token 1');
    if (!!callback) {
      console.log('callback 1');
      useAuthCallback(callback, authData);
      storage.remove('opr-auth-callback');
      return null;
    }

    console.log('Redirect /profile');
    return <Redirect to="/profile"/>
  } else if (isConfirmation) {
    console.log('isConfirmation');
    const {op} = reqParams;
    if (op === 'signup_confirm') {
      console.log('signup_confirm');
      return <EmailConfirmation params={reqParams} onSuccess={logIn}/>
    } else if (op === 'reset_pwd') {
      console.log('reset_pwd');
      return <ResetPwdConfirmation params={reqParams}/>
    }
  } else if (isOAuth) {
    console.log('isOAuth');
    if (!!authData.name) {
      console.log('authData.token 2');
      if (!!callback) {
        console.log('callback 2');
        useAuthCallback(callback, authData);
        storage.remove('opr-auth-callback');
        return null;
      }

      console.log('Redirect /profile');
      return <Redirect to="/profile"/>;
    }

    console.log('OAuthConfirmation');
    return <OAuthConfirmation params={reqParams} onSignUp={signUp} onLogIn={logIn}/>
  }

  console.log('Redirect /');
  return <Redirect to={"/"}/>;
};
