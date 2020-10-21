import React, {useState, useContext} from 'react';
import {Link, Redirect} from "react-router-dom";
import qs from "qs";

import SignUpForm from "./SignUpForm";
import {UserContext} from "../../context";
import ChangeAuthType from "./blocks/ChangeAuthType";

export default () => {
  const oauthParams = qs.parse(location.search.substring(1));
  const isPostAuth = Object.keys(oauthParams).length > 0;
  const {authData, signUp} = useContext(UserContext);
  const [isFormVisible, setVisibilityForm] = useState(isPostAuth);

  const onSignUp = (data) => {
    signUp(data);
    return <Redirect to={"/profile"}/>;
  };

  if(authData.name) {
    return <Redirect to={"/profile"}/>;
  }

  return <div className="auth-container" id="opr-app">
    <h1>Sign Up</h1>
    <p>
      OpenPlaceReviews has a public database, so we do not store any private data.
      You can select a nickname and it will be visible to everyone.<br />
      Already have an account? Then please <Link to="/login">Login</Link>.<br />
    </p>

    {(!isPostAuth) && <ChangeAuthType showForm={() => setVisibilityForm(true)}/>}

    {isFormVisible && <SignUpForm onSuccess={onSignUp} oauthParams={oauthParams}/>}
  </div>;
};
