import React, {useEffect, useState} from "react";

import Alert from "@material-ui/lab/Alert";
import {Button, TextField, FormHelperText} from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';

import auth from "../../api/auth";

const TYPING_TIMEOUT = 1000;

let writeTimeout = null;
export default ({oauthNickname, oauthAccessToken, possibleSignups = [], userDetails = {}, onSuccess, onError}) => {
  const [showAlert, setAlert] = useState(null);
  const [isSubmit, setSubmit] = useState(false);

  const [formData, setData] = useState({
    oauthNickname: {
      value: possibleSignups.length ? possibleSignups[0] : oauthNickname,
      error: ''
    },
  });

  if (userDetails.email) {
    delete userDetails.email;
  }

  const defaultAlertMsg = "Error while processing request. Please try again later.";

  const handler = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    setData( formData => ({
      ...formData,
      [name]: {
        ...formData[name],
        value
      }
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await auth.checkName(formData.oauthNickname.value);
        let error = '';
        if (data && data["db-name"] === "ok" && data["blockchain"] === 'ok') {
          error = 'Username already inuse';
        }

        setData( formData => ({
          ...formData,
          oauthNickname: {
            ...formData.oauthNickname,
            error,
          }
        }));

        setAlert(null);
      } catch (error) {
        if (error.response && error.response.data){
          setAlert(error.response.data.message);
        } else {
          setAlert(defaultAlertMsg);
        }
      }
    };

    if (formData.oauthNickname.value.length) {
      clearTimeout(writeTimeout);
      writeTimeout = setTimeout(() => {
        fetchData();
      }, TYPING_TIMEOUT);
    }
  }, [formData.oauthNickname.value]);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        name: formData.oauthNickname.value,
        oauthAccessToken,
      };

      try {
        const {data} = await auth.logIn(params);

        onSuccess({
          name: formData.oauthNickname.value,
          token: data.eval.privatekey,
        });
      } catch (error) {
        const {response} = error;
        if (response && response.data && response.data.message){
          onError(response.data.message);
        } else {
          onError(defaultAlertMsg);
        }
      }

      setSubmit(false);
    };

    if (isSubmit) {
      fetchData();
    }
  }, [isSubmit]);

  if (possibleSignups.length === 1) {
    setSubmit(true);
    return <div className="loader">Loading...</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  return <form className="signup-form" autoComplete="off" onSubmit={onSubmit}>
    {showAlert && <Alert
      className="form-alert"
      severity="error">
      {showAlert}
    </Alert>}

    <div className="form-item">
      <p>Please select previous username from list or enter new</p>
      <Autocomplete
        freeSolo
        options={possibleSignups}
        value={formData.oauthNickname.value}
        onChange={handler}
        fullWidth={true}
        renderInput={(params) => {
          return <TextField
            {...params}
            error={formData.oauthNickname.error.length > 0}
            name="oauthNickname"
            required={true}
            label="Username"
            placeholder="Enter a username"
            variant="outlined"
          />
        }}
      />
      <FormHelperText error={formData.oauthNickname.error.length > 0}>
        {formData.oauthNickname.error ? formData.oauthNickname.error : 'Username is public'}
      </FormHelperText>
    </div>

    <Button variant="outlined" type="submit" color="primary" disabled={!formData.oauthNickname.value}>Send</Button>
  </form>;
}
