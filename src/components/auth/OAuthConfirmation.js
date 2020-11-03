import React, {useEffect, useState} from "react";
import auth from "../../api/auth";
import OAuthSignUpForm from "./OAuthSignUpForm";
import OAuthLogInForm from "./OAuthLogInForm";

export default ({params, onSuccess}) => {
  const [errorMsg, setError] = useState('');
  const [confirmData, setConfirmData] = useState(null);

  const defaultAlertMsg = "Error while processing request. Please try again later.";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: postAuthData} = await auth.oauthConfirm({
          token: params.oauth_token,
          oauthVerifier: params.oauth_verifier,
          code: params.code,
        });

        setConfirmData(postAuthData);
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError(defaultAlertMsg);
        }
      }
    };

    if (params.code || params.oauth_token || params.oauth_verifier) {
      fetchData();
    }
  }, []);

  if (errorMsg) {
    return <div className="auth-container" id="opr-app">
      <h1>OAuth login failed</h1>
      <p>{errorMsg}</p>
    </div>
  }

  if (confirmData) {
    if(!confirmData.possibleSignups.length || params.force_signup) {
      return <div className="auth-container" id="opr-app">
        <h1>Welcome, <span className="username">{confirmData.oauthNickname}</span></h1>

        <p>
          You are almost ready to sign up.<br/>
          Open Place Reviews <span className="highlight bold">stores all changes in a public database</span> except private data marked with *.
        </p>
        <OAuthSignUpForm
          oauthNickname={confirmData.oauthNickname}
          oauthAccessToken={confirmData.accessToken}
          userDetails={confirmData.details}
          possibleSignups={confirmData.possibleSignups}
          onSuccess={onSuccess}
          onError={setError}
        />
      </div>;
    } else {
      return <div className="auth-container" id="opr-app">
        <h1>Welcome, <span className="username">{confirmData.oauthNickname}</span></h1>

        <p>You are almost ready to login.</p>

        <OAuthLogInForm
          oauthNickname={confirmData.oauthNickname}
          oauthAccessToken={confirmData.accessToken}
          userDetails={confirmData.details}
          possibleSignups={confirmData.possibleSignups}
          onSuccess={onSuccess}
          onError={setError}
        />
      </div>;
    }
  }

  return <div className="auth-container" id="opr-app">
    <div className="loader">Loading...</div>
  </div>;
}
