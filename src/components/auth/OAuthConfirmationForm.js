import React, {useEffect, useRef, useState} from "react";

import Alert from "@material-ui/lab/Alert";
import {Button, TextField} from "@material-ui/core";

import auth from "../../api/auth";

const TYPING_TIMEOUT = 1000;

let writeTimeout = null;
export default ({oauthNickname, oauthAccessToken, userDetails, onSuccess, onError}) => {
  const [showAlert, setAlert] = useState(null);
  const [isReady, setReady] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [formData, setData] = useState({
    oauthNickname: {
      value: oauthNickname,
      error: ''
    },
  });

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

  const formRef = useRef();
  useEffect(() => {
    setReady(!formData.oauthNickname.error.length && formRef.current.checkValidity());
  }, [formData, isReady]);

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
      try {
        const email = userDetails.email;
        if (email && email.length) {
          delete userDetails.email;
        }

        await auth.signUp({
          name: formData.oauthNickname.value,
          oauthAccessToken,
          userDetails,
          email,
        });

        const {data} = await auth.logIn({
          name: formData.oauthNickname.value,
          oauthAccessToken,
        });

        onSuccess({
          name: formData.oauthNickname.value,
          token: data.eval.privatekey,
        });
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data){
          onError(error.response.data.message);
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

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  return <form className="signup-form" autoComplete="off" onSubmit={onSubmit} ref={formRef}>
      {showAlert && <Alert
        className="form-alert"
        severity="error">
        {showAlert}
      </Alert>}

      <div className="form-item">
        <TextField
          name="oauthNickname"
          required={true}
          fullWidth={true}
          onChange={handler}
          label="Nickname"
          placeholder="Enter a nickname"
          value={formData.oauthNickname.value}
          error={formData.oauthNickname.error.length > 0}
          helperText={formData.oauthNickname.error ? formData.oauthNickname.error : ''}
          variant="outlined"
        />


        {/*<Autocomplete*/}
        {/*  id="combo-box-demo"*/}
        {/*  options={possibleSignups}*/}
        {/*  value={formData.oauthNickname.value}*/}
        {/*  onChange={handler}*/}
        {/*  fullWidth={true}*/}
        {/*  renderInput={(params) => {*/}
        {/*    return <TextField*/}
        {/*      {...params}*/}
        {/*      name="oauthNickname"*/}
        {/*      required={true}*/}
        {/*      label="Nickname"*/}
        {/*      placeholder="Enter a nickname"*/}
        {/*      error={formData.oauthNickname.error.length > 0}*/}
        {/*      helperText={formData.oauthNickname.error ? formData.oauthNickname.error : ''}*/}
        {/*      variant="outlined"*/}
        {/*    />*/}
        {/*  }}*/}
        {/*/>*/}
      </div>

      <Button variant="outlined" type="submit" color="primary" disabled={isReady !== true}>Send</Button>
    </form>;
}
