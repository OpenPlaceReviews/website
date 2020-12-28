import React, {useContext, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import qs from "qs";

import {UserContext} from "../../../context";

import LoginForm from "./LoginForm";
import ChangeAuthType from "./blocks/ChangeAuthType";


export default () => {
  const {authData, logIn} = useContext(UserContext);
  const [isFormVisible, setVisibilityForm] = useState(false);
  const reqParams = qs.parse(location.search.substring(1));

  const onLogIn = (data) => {
    logIn(data);
  };

  if(authData.token) {
    if (!!reqParams.callback) {
      window.location.href = `${reqParams.callback}?opr-nickname=${encodeURIComponent(authData.name)}&opr-token=${encodeURIComponent(authData.token)}`;
      return null;
    }

    return <Redirect to={"/profile"}/>;
  }

  return <div className="auth-container" id="opr-app">
    <h1>Login</h1>

    <p>Don't have an account? <Link to="/signup">Create account</Link></p>

    <ChangeAuthType showForm={() => setVisibilityForm(true)}/>

    {isFormVisible && <LoginForm onSuccess={onLogIn} reqParams={reqParams}/>}
  </div>;
};
