import React, {useContext, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import qs from "qs";

import storage from "../../../storage";
import AuthContext from "./providers/AuthContext";
import useAuthCallback from "./hooks/useAuthCallback";

import SignUpForm from "./blocks/forms/SignUpForm";
import AuthSelector from "./blocks/AuthSelector";

export default function SignUpPage() {
  const {authData, signUp} = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const {force_signup, callback} = qs.parse(location.search.substring(1));

  if (force_signup === 'true') {
    storage.set('opr-force-signup', true);
  } else {
    storage.remove('opr-force-signup');
  }

  const onSignUp = (data) => {
    signUp(data);
    setRedirect(true);
  };

  if(authData.token || redirect) {
    if (!!callback) {
      useAuthCallback(callback, authData);
      return null;
    }

    return <Redirect to={"/profile"}/>;
  }

  return <div>
    <h1>Sign Up</h1>
    <p>
      OpenPlaceReviews has a public database, so we do not store any private data. <span className="highlight">You can select a nickname and it will be visible to everyone.</span>
    </p>
    <p>Already have an account? Then please <Link to="/login">Login</Link>.</p>
    <AuthSelector Form={SignUpForm} onSuccess={onSignUp} header="Select registration method:"/>
  </div>;
};
