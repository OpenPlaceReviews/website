import React, {useEffect, useState} from "react";

import {Button, Select, FormHelperText, MenuItem} from "@material-ui/core";

import auth from "../../../api/auth";

export default ({oauthNickname, oauthAccessToken, possibleSignups = [], onLogIn, onSignUp, onError}) => {
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
        const { data: { 'db-name': name, email, 'email-expired': emailExpired, blockchain } } = await auth.checkName(params.name);

        if (blockchain !== 'ok' && name === 'ok' && email === 'ok' && emailExpired === "false") {
          onSignUp({ name: params.name });
        } else {
          const {data} = await auth.logIn(params);

          onLogIn({
            name: params.name,
            token: data.eval.privatekey,
          });
        }
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
      >
        {possibleSignups.map((name, i) => <MenuItem value={name} key={i}>{name}</MenuItem> )}
      </Select>
      <FormHelperText error={formData.oauthNickname.error.length > 0}>
        {formData.oauthNickname.error ? formData.oauthNickname.error : ''}
      </FormHelperText>
    </div>

    <Button variant="outlined" type="submit" color="primary">Send</Button>
  </form>;
}
