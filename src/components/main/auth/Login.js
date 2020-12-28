import React, {useContext, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import qs from "qs";

import {UserContext} from "../../../context";

import LoginForm from "./LoginForm";
import ChangeAuthType from "./blocks/ChangeAuthType";


export default () => {
  const {authData, logIn} = useContext(UserContext);
  const [isFormVisible, setVisibilityForm] = useState(false);
  const [redirectTo, setRedirect] = useState('');
  const reqParams = qs.parse(location.search.substring(1));

  const onLogIn = (data) => {
    logIn(data);
    if (!!reqParams.callback) {
      setRedirect(reqParams.callback);
    } else {
      setRedirect('/profile');
    }
  };

  if(authData.token) {
    if (!!reqParams.callback) {
      window.location.href = `${reqParams.callback}?token=${authData.token}`;
      return null;
    } else {
      return <Redirect to={'/profile'}/>;
    }
  }

  if (redirectTo) {
    if (redirectTo === reqParams.callback) {
      window.location.href = `${reqParams.callback}?token=${authData.token}`;
      return null;
    } else {
      return <Redirect to={redirectTo}/>;
    }
  }

  return <div className="auth-container" id="opr-app">
    <h1>Login</h1>

    <p>Don't have an account? <Link to="/signup">Create account</Link></p>

    <ChangeAuthType showForm={() => setVisibilityForm(true)}/>

    {isFormVisible && <LoginForm onSuccess={onLogIn} reqParams={reqParams}/>}
  </div>;
};
