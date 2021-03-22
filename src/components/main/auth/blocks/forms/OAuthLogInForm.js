import React, {useEffect, useState} from "react";
import {Select, FormHelperText, MenuItem} from "@material-ui/core";
import storage from "../../../../../libs/cookies";

import auth from "../../../../../api/auth";
import useForm from "./hooks/useForm";
import Loader from "../../../blocks/Loader";
import Form from "./blocks/Form";
import FormItem from "./blocks/FormItem";
import SubmitButton from "./blocks/SumbitButton";

export default function OAuthLoginForm({onLogIn, onSignUp, onError, preAuthParams}) {
  const {accessToken, oauthNickname, possibleSignups} = preAuthParams;
  const [state, setState] = useState({
    submitted: false,
  });
  const [error, setError] = useState(null);
  const {formData, handler} = useForm({
    name: {
      value: possibleSignups.length ? possibleSignups[0] : oauthNickname,
      error: '',
      required: true,
    },
  });
  const reqParams = storage.get('opr-auth-callback') || {};

  const isAutoLogin = possibleSignups.length === 1;
  const {submitted} = state;

  useEffect(() => {
    const fetchData = async () => {
      let result;

      try {
        result = await auth.checkName(formData.name.value);
      } catch (error) {
        if (error.response) {
          const {
            data: { message },
          } = error.response;

          setState({
            submitted: false,
            alert: message,
          });
          return;
        }

        setError(error);
        return;
      }

      const { data: { email, blockchain, 'db-name': name, 'email-expired': emailExpired }} = result;
      if (blockchain !== 'ok' && name === 'ok' && email === 'ok' && emailExpired === "false") {
        onSignUp({name: formData.name.value});
        return;
      }

      try {
        const params = {
          name: formData.name.value,
          oauthAccessToken: accessToken,
        };
        result = await auth.logIn(params, reqParams);
      } catch (error) {
        if (error.response) {
          const {
            data: { message },
          } = error.response;

          onError(message);
          return;
        }

        setError(error);
        return;
      }

      const { data } = result;
      onLogIn({
        name: formData.name.value,
        provider: data.create[0].id[1],
        token: data.eval.privatekey,
      });
    };

    if (submitted || isAutoLogin) {
      fetchData();
    }
  }, [submitted]);

  if (error) {
    throw error;
  }

  if (isAutoLogin) {
    return <Loader/>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setState({alert: '', submitted: true});
  };

  return <Form submitted={submitted} onSubmit={onSubmit}>
    <FormItem disabled={submitted}>
      <p>We noticed that you already using this OAuth method. Please select one of the accounts below to continue.</p>
      <Select
        name="name"
        value={formData.name.value}
        onChange={handler}
        fullWidth={true}
        error={formData.name.error.length > 0}
        required={true}
        variant="outlined"
      >
        {possibleSignups.map((name, i) => <MenuItem value={name} key={i}>{name}</MenuItem> )}
      </Select>

      <FormHelperText error={formData.name.error.length > 0}>
        {formData.name.error ? formData.name.error : ''}
      </FormHelperText>
    </FormItem>

    <SubmitButton onClick={onSubmit} disabled={submitted}>Continue</SubmitButton>
  </Form>;
}
