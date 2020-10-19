import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import qs from "qs";
import {UserContext} from "../../context";

import auth from "../../api/auth";

export default ({location}) => {
  const {authData, logIn} = useContext(UserContext);
  const [result, setResult] = useState("Checking...");
  const history = useHistory();

  const params = qs.parse(location.search.substring(1));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {name, token} = await auth.signUpConfirm(params);
        logIn({
          name,
          token,
          isVerified: true,
        });

        setResult(<>
          <h1>Email is confirmed</h1>
          <p>Your email is successfully confirmed and you can start contributing to OpenPlaceReviews.</p>
          <p>Please visit <a href="/map.html">map</a> to find places to contribute.</p>
        </>);
      } catch (error) {
        let errMessage = "Error while processing request. Please try again later.";
        if (error.response && error.response.data){
          errMessage = error.response.data.message;
        }

        setResult(<>
          <h1>Email not confirmed</h1>
          <p>{errMessage}</p>
        </>);
      }
    };

    if (params.name && params.token) {
      fetchData();
    }
  }, []);

  if (authData.token) {
    history.push('/profile');
  }

  if (!params.name || !params.token) {
    history.push('/');
  }

  return <div className="auth-container" id="opr-app">
    {result}
  </div>;
};
