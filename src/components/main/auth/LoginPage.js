import React, {useContext} from 'react';
import {Link, Redirect} from "react-router-dom";
import qs from "qs";

import AuthContext from "./providers/AuthContext";

import LoginForm from "./blocks/forms/LoginForm";
import AuthSelector from "./blocks/AuthSelector";
import useAuthCallback from "./hooks/useAuthCallback";

export default function LoginPage() {
  const {authData, logIn} = useContext(AuthContext);
  const {callback} = qs.parse(location.search.substring(1));

  const onLogIn = (data) => {
    logIn(data);
  };

  if(authData.token) {
    if (!!callback) {
      useAuthCallback(callback, authData);
      return null;
    }

    return <Redirect to={"/profile"}/>;
  }

  return <div>
    <h1>Login</h1>
    <p>Don't have an account? <Link to="/signup">Create account</Link></p>
    <AuthSelector Form={LoginForm} onSuccess={onLogIn} header="Select registration method:"/>
  </div>;
};
