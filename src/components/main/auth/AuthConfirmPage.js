import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import qs from "qs";

import AuthContext from "./providers/AuthContext";

import EmailConfirmation from "./EmailConfirmation";
import ResetPwdConfirmation from "./ResetPwdConfirmation";
import OAuthConfirmation from "./OAuthConfirmation";

export default ({location}) => {
  const {authData, logIn, signUp} = useContext(AuthContext);
  const reqParams = qs.parse(location.search.substring(1));
  const isConfirmation = (reqParams.name && reqParams.token && reqParams.op);
  const isOAuth = (reqParams.oauth_token || reqParams.oauth_verifier || reqParams.code);

  if (!!authData.token) {
    return <Redirect to="/profile"/>
  } else if (isConfirmation) {
    const {op} = reqParams;
    if (op === 'signup_confirm') {
      return <EmailConfirmation params={reqParams} onSuccess={logIn}/>
    } else if (op === 'reset_pwd') {
      return <ResetPwdConfirmation params={reqParams}/>
    }
  } else if (isOAuth) {
    if (!!authData.name) {
      return <Redirect to="/profile"/>;
    }

    return <OAuthConfirmation params={reqParams} onSignUp={signUp} onLogIn={logIn}/>
  }

  return <Redirect to={"/"}/>;
};
