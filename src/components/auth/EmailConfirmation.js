import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import {Button, TextField} from "@material-ui/core";
import auth from "../../api/auth";
import {UserContext} from "../../context";
import Alert from "@material-ui/lab/Alert";

export default ({params = {}, onSuccess}) => {
  const {logOut} = useContext(UserContext);

  const [isError, setError] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [isSubmit, setSubmit] = useState(false);
  const [redirectTo, setRedirect] = useState('');
  const [showAlert, setAlert] = useState(null);
  const [confirmData, setData] = useState({
    token: params.token || '',
    name: params.name || '',
  });

  const handler = (event) => {
    const { target } = event;
    const { name, value } = target;

    setData( confirmData => ({
      ...confirmData,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await auth.signUpConfirm(confirmData);
        setAuthToken(data.eval.privatekey);
      } catch (error) {
        if(!params.name && !params.token) {
          setError(true);
        } else {
          if (error.response && error.response.data){
            setAlert(error.response.data.message);
          } else {
            setAlert("Error while processing request. Please try again later.");
          }
        }
      }

      setSubmit(false);
    };

    if ((params.name && params.token) || isSubmit) {
      fetchData();
    }
  }, [isSubmit]);

  const onSignup = () => {
    logOut();
    setRedirect("/signup")
  };

  if (redirectTo) {
    return <Redirect to={redirectTo}/>;
  }

  if (authToken) {
    return <div className="auth-container" id="opr-app">
      <h1>Email confirmed!</h1>
      <p>Your email is successfully confirmed. Start using OpenPlaceReviews.org by clicking continue.</p>

      <Button variant="outlined" type="submit" color="primary" onClick={() => {
        onSuccess({
          name: confirmData.name,
          token: authToken,
        });
      }}>Continue</Button>
    </div>
  }

  if (isError) {
    return <div className="auth-container" id="opr-app">
      <h1>Email is not yet confirmed</h1>
      <p>Email validation link is out of date. Please signup again.</p>
      <Button variant="outlined" type="submit" color="primary" onClick={onSignup}>Signup</Button>
    </div>
  }

  if (!params.op) {
    return <div className="auth-container" id="opr-app">
      <h1>Email not yet confirmed</h1>
      <p>Your account registration is not complete yet. You should have received and email with verification link. You can aslo copy and paste activation code from it.</p>

      <form className="signup" autoComplete="off">
        {showAlert && <Alert
          className="form-alert"
          severity="error"
          onClose={() => setAlert(null)}>
          {showAlert}
        </Alert>}

        <div className="form-item">
          <TextField
            name="token"
            label="Email activation code"
            placeholder="Paste activation code"
            required={true}
            variant="outlined"
            onChange={handler}
            value={confirmData.token}
            fullWidth={true}
          />
        </div>

        <Button
          variant="outlined"
          type="button"
          color="primary"
          onClick={() => setSubmit(true)}
          disabled={!confirmData.token}>
          Verify email
        </Button>
      </form>
    </div>;
  }

  return <div className="auth-container" id="opr-app">
    <div className="loader">Loading...</div>
  </div>;
}
