import React, {useEffect, useState} from "react";
import auth from "../../../api/auth";
import storage from "../../../libs/cookies";

import OAuthSignUpForm from "./blocks/forms/OAuthSignUpForm";
import OAuthLogInForm from "./blocks/forms/OAuthLogInForm";
import Loader from "../blocks/Loader";

export default ({params, onLogIn, onSignUp}) => {
  const [state, setState] = useState({
    data: {},
    loading: true,
  });
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState('');
  const {oauth_token, oauth_verifier, code} = params;

  console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      try {
        console.log('fetchData');
        result = await auth.oauthConfirm({
          token: oauth_token,
          oauthVerifier: oauth_verifier,
          code,
        });
      } catch (error) {
        console.log(error);
        if (error.response) {
          const {
            data: { message },
          } = error.response;

          setAlert(message);
          return;
        }

        setError(error);
        return;
      }

      if (!result.data) {
        console.log('Server responce is empty');
        setError(new Error('Server responce is empty'));
        return;
      }

      console.log('fetchData OK');
      setState({
        loading: false,
        data: result.data,
      });
    };

    fetchData();
  }, []);

  if (error) {
    throw error;
  }

  if (alert) {
    return <div className="auth-container" id="opr-app">
      <h1>Authorization failed</h1>
      <p>{alert}</p>
    </div>
  }

  let description;
  let form;
  const {oauthNickname, possibleSignups} = state.data;
  console.log(state.loading);
  console.log(state.data);
  console.log(storage.get('opr-force-signup'));
  if (!state.loading) {
    const force_signup = storage.get('opr-force-signup') || false;
    if(!possibleSignups.length || force_signup === true) {
      const onSignUpHandler = (params) => {
        console.log('remove opr-force-signup');
        storage.remove('opr-force-signup');
        onSignUp(params);
      };

      description = <p>
        You are almost ready to sign up.<br/>
        Open Place Reviews <span className="highlight bold">stores all changes in a public database</span> except private data marked with *.
      </p>;

      form = <OAuthSignUpForm
          preAuthParams={state.data}
          onLogIn={onLogIn}
          onSignUp={onSignUpHandler}
          onError={setAlert}
      />;
    } else {
      description = <p>You are almost ready to login.</p>;
      form = <OAuthLogInForm
          preAuthParams={state.data}
          onLogIn={onLogIn}
          onSignUp={onSignUp}
          onError={setAlert}
      />;
    }

    return <div>
      <h1>Welcome, <span className="username">{oauthNickname}</span></h1>
      {description}
      {form}
    </div>;
  }

  return <Loader/>;
}
