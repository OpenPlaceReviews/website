import React, {useEffect, useRef, useState} from "react";

import Alert from "@material-ui/lab/Alert";
import {Button, TextField, FormHelperText} from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';

import auth from "../../api/auth";
import COSBlock from "./blocks/COSBlock";
import TOSBlock from "./blocks/TOSBlock";
import OptionalUserFields from "./blocks/OptionalUserFields";

const TYPING_TIMEOUT = 1000;

let writeTimeout = null;
export default ({oauthNickname, oauthAccessToken, possibleSignups = [], userDetails = {}, onSuccess, onError}) => {
  const [showAlert, setAlert] = useState(null);
  const [isReady, setReady] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [formData, setData] = useState({
    oauthNickname: {
      value: oauthNickname,
      error: ''
    },
    email: {
      value: userDetails.email || '',
      error: ''
    },
    contribution_terms: {
      value: false,
      error: ''
    },
    terms_of_service: {
      value: false,
      error: ''
    },
    languages: {
      value: [],
      error: ''
    },
    country: {
      value: '',
      error: '',
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

    const username = formData.oauthNickname.value;

    if (username.length && !possibleSignups.includes(username)) {
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
        email: formData.email.value,
        userDetails: {
          ...userDetails,
          languages: formData.languages.value,
          country: formData.country.value,
        },
        oauthAccessToken,
      };

      try {
        await auth.signUp(params);

        const {data} = await auth.logIn({
          name: formData.oauthNickname.value,
          oauthAccessToken,
        });

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

  const formRef = useRef();
  useEffect(() => {
    const unlockForm = () => {
      let errors = 0;
      for (let field in formData) {
        if (formData[field].error.length) {
          errors++;
        }
      }

      setReady(errors === 0 && formRef.current.checkValidity());
    };

    unlockForm();
  }, [formData, isReady]);

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
            onChange={handler}
            name="oauthNickname"
            required={true}
            label="Nickname"
            placeholder="Enter a nickname"
            variant="outlined"
          />
        }}
      />
      <FormHelperText error={formData.oauthNickname.error.length > 0}>
        {formData.oauthNickname.error ? formData.oauthNickname.error : ''}
      </FormHelperText>
    </div>

    <div className="form-item">
      <TextField
        name="email"
        required={true}
        label="E-mail"
        placeholder="Enter email"
        onChange={handler}
        value={formData.email.value}
        variant="outlined"
        helperText="Will not be published to Open Place Reviews and will be only used for system notifications"
        fullWidth={true}
      />
    </div>

    <COSBlock onChange={handler} isAccept={formData.contribution_terms.value}/>
    <TOSBlock onChange={handler} isAccept={formData.terms_of_service.value}/>

    <OptionalUserFields
      onChange={handler}
      languages={formData.languages}
      country={formData.country}
    />

    <Button variant="outlined" type="submit" color="primary" disabled={isReady !== true}>Send</Button>
  </form>;
}
