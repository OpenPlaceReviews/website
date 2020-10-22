import React, {useContext, useState} from 'react';
import {Link, Redirect} from "react-router-dom";

import {UserContext} from "../../context";

import LoginForm from "./LoginForm";
import ChangeAuthType from "./blocks/ChangeAuthType";


export default () => {
  const {authData, logIn} = useContext(UserContext);
  const [isFormVisible, setVisibilityForm] = useState(false);

  const onLogIn = (data) => {
    logIn(data);
    return <Redirect to={"/profile"}/>
  };

  if(authData.name) {
    return <Redirect to={"/profile"}/>;
  }

  return <div className="auth-container" id="opr-app">
    <h1>Login</h1>

    <p>Don't have an account? <Link to="/signup">Create account</Link></p>
    <p>Forgot password? <Link to="/reset-password">Reset password</Link></p>

    <ChangeAuthType showForm={() => setVisibilityForm(true)}/>

    {isFormVisible && <LoginForm onSuccess={onLogIn}/>}
  </div>;
};
