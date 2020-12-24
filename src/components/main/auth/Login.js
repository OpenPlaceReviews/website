import React, {useContext, useEffect, useState} from 'react';
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
    let callback = '/profile';
    if (!!reqParams.callback) {
      callback = reqParams.callback;
    }

    setRedirect(callback);
  };

  useEffect(() => {
    if (redirectTo) {
      window.location.href = redirectTo;
    }
  }, [redirectTo]);

  if(authData.token) {
    return <Redirect to={"/profile"}/>;
  }

  return <div className="auth-container" id="opr-app">
    <h1>Login</h1>

    <p>Don't have an account? <Link to="/signup">Create account</Link></p>

    <ChangeAuthType showForm={() => setVisibilityForm(true)}/>

    {isFormVisible && <LoginForm onSuccess={onLogIn} reqParams={reqParams}/>}
  </div>;
};
