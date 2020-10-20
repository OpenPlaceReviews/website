import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import qs from "qs";
import {UserContext} from "../../context";

import EmailConfirmation from "./EmailConfirmation";
import ResetPwdConfirmation from "./ResetPwdConfirmation";

export default ({location}) => {
  const {authData, logIn} = useContext(UserContext);

  const params = qs.parse(location.search.substring(1));
  if (!params.name && !params.token && !params.op) {
    return <Redirect to={"/"}/>;
  }

  if (params.op === 'signup_confirm') {
    return <EmailConfirmation isLoggedIn={authData.token && authData.token.length} params={params} onSuccess={logIn}/>
  } else if (params.op === 'reset_pwd') {
    return <ResetPwdConfirmation params={params}/>
  }
};
