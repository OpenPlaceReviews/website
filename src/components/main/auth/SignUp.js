import React, {useState, useContext} from 'react';
import {Link, Redirect} from "react-router-dom";
import qs from "qs";
import storage from "../../../storage";

import SignUpForm from "./SignUpForm";
import {UserContext} from "../../../context";
import ChangeAuthType from "./blocks/ChangeAuthType";

export default () => {
  const {authData, signUp} = useContext(UserContext);
  const [isFormVisible, setVisibilityForm] = useState(false);
  const [redirectTo, setRedirect] = useState('');
  const {force_signup} = qs.parse(location.search.substring(1));

  const onSignUp = (data) => {
    signUp(data);
    setRedirect('/profile');
  };

  if (force_signup === 'true') {
    storage.set('opr-force-signup', true);
  } else {
    storage.remove('opr-force-signup');
  }

  if (redirectTo) {
    return <Redirect to={redirectTo}/>;
  }

  if (authData.token) {
    return <Redirect to={"/profile"}/>;
  }

  return <div className="auth-container" id="opr-app">
    <h1>Sign Up</h1>
    <p>
      OpenPlaceReviews has a public database, so we do not store any private data. <span className="highlight">You can select a nickname and it will be visible to everyone.</span>
    </p>
    <p>Already have an account? Then please <Link to="/login">Login</Link>.</p>

    <ChangeAuthType showForm={() => setVisibilityForm(true)}/>

    {isFormVisible && <SignUpForm onSuccess={onSignUp}/>}
  </div>;
};