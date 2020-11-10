import React, {useEffect, useState} from "react";

import {Button, Select, FormHelperText} from "@material-ui/core";

import auth from "../../api/auth";

export default ({oauthNickname, oauthAccessToken, possibleSignups = [], onSuccess, onError}) => {
  const [isSubmit, setSubmit] = useState(false);
  const [formData, setData] = useState({
    oauthNickname: {
      value: possibleSignups.length ? possibleSignups[0] : oauthNickname,
      error: ''
    },
  });

  const isAutoLogin = possibleSignups.length === 1;

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

    if (isSubmit || isAutoLogin) {
      fetchData();
    }
  }, [isSubmit]);

  if (isAutoLogin) {
    return <div className="loader">Loading...</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  return <form className="signup-form" autoComplete="off" onSubmit={onSubmit}>
    <div className="form-item">
      <p>We noticed that you already using this OAuth method. Please select one of the accounts below to continue.</p>
      <Select
        name="oauthNickname"
        value={formData.oauthNickname.value}
        onChange={handler}
        fullWidth={true}
        error={formData.oauthNickname.error.length > 0}
        required={true}
        label="Username"
        placeholder="Select a username"
        variant="outlined"
      />
      <FormHelperText error={formData.oauthNickname.error.length > 0}>
        {formData.oauthNickname.error ? formData.oauthNickname.error : ''}
      </FormHelperText>
    </div>

    <Button variant="outlined" type="submit" color="primary">Send</Button>
  </form>;
}
