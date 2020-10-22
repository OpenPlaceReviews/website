import React, {useEffect, useState} from "react";
import auth from "../../api/auth";
import {Redirect} from "react-router-dom";

export default ({isLoggedIn, params, onSuccess}) => {
  const [errorMsg, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: confirmData} = await auth.oauthConfirm({
          token: params.oauth_token,
          oauthVerifier: params.oauth_verifier,
          code: params.code,
        });
        const email = confirmData.details.email;
        if (email && email.length) {
          delete confirmData.details.email;
        }

        const {data: status} = await auth.checkName(confirmData.nickname);

        if (status.blockchain !== 'ok') {
          await auth.signUp({
            name: confirmData.nickname,
            oauthAccessToken: confirmData.accessToken,
            userDetails: confirmData.details,
            email,
          });
        }

        const {data} = await auth.logIn({
          name: confirmData.nickname,
          oauthAccessToken: confirmData.accessToken
        });

        onSuccess({
          name: confirmData.nickname,
          token: data.eval.privatekey,
        });
      } catch (error) {
        let errMessage = "Error while processing request. Please try again later.";
        if (error.response && error.response.data) {
          errMessage = error.response.data.message;
        }

        setError(errMessage);
      }
    };

    if (!isLoggedIn && (params.code || params.oauth_token || params.oauth_verifier)) {
      fetchData();
    }
  }, []);

  if (isLoggedIn) {
    return <Redirect to={"/profile"}/>
  }

  if (errorMsg) {
    return <div className="auth-container" id="opr-app">
      <h1>OAuth login failed</h1>
      <p>{errorMsg}</p>
    </div>
  }

  return <div className="auth-container" id="opr-app">
    Checking token...
  </div>;
}
