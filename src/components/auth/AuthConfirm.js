import React, {useContext, useEffect, useState} from "react";
import qs from "qs";
import {UserContext} from "../../context";

import auth from "../../api/auth";

export default ({location}) => {
  const {authData, logIn} = useContext(UserContext);
  const [result, setResult] = useState("Checking...");

  const params = qs.parse(location.search.substring(1));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await auth.signUpConfirm(params);
        console.log(data);

        setResult("Your email iis successfully confirmed. Start using OpenPlaceReviews.org.");
      } catch (error) {
        if (error.response && error.response.data){
          setResult(error.response.data.message);
        } else {
          setResult("Error while processing request. Please try again later.");
        }
      }
    };

    if (params.name && params.token) {
      fetchData();
    }
  }, []);

  return <div className="auth-container" id="opr-app">
    <h1>Email confirmation</h1>
    <p>
      {result}
    </p>
  </div>;
};
