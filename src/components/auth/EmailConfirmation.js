import React, {useEffect, useState} from 'react';
import auth from "../../api/auth";

export default ({isLoggedIn, params, onSuccess}) => {
  const [errorMsg, setError] = useState('');

  if (isLoggedIn) {
    return <div className="auth-container" id="opr-app">
      <h1>Email is confirmed</h1>
      <p>Your email is successfully confirmed and you can start contributing to OpenPlaceReviews.</p>
      <p>Please visit <a href="/map.html">map</a> to find places to contribute.</p>
    </div>
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await auth.signUpConfirm(params);
        onSuccess({
          name: params.name,
          token: data.eval.privatekey,
        });
      } catch (error) {
        let errMessage = "Error while processing request. Please try again later.";
        if (error.response && error.response.data){
          errMessage = error.response.data.message;
        }

        setError(errMessage);
      }
    };

    if (params.name && params.token && params.op) {
      fetchData();
    }
  }, []);

  if (errorMsg) {
    return <div className="auth-container" id="opr-app">
      <h1>Email not confirmed</h1>
      <p>{errorMsg}</p>
    </div>
  }

  return <div className="auth-container" id="opr-app">
    Checking token...
  </div>;
}
