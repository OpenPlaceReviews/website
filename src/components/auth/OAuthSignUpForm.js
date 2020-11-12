import React, {useEffect, useRef, useState} from "react";

import Alert from "@material-ui/lab/Alert";
import {Button, TextField, FormHelperText} from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import storage from "../../storage";

import auth from "../../api/auth";
import COSBlock from "./blocks/COSBlock";
import TOSBlock from "./blocks/TOSBlock";
import OptionalUserFields from "./blocks/OptionalUserFields";

const TYPING_TIMEOUT = 1000;

let writeTimeout = null;
export default ({oauthNickname, oauthAccessToken, possibleSignups = [], userDetails = {}, onSignUp, onLogIn, onError}) => {
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
      error: '',
      readonly: !!userDetails.email,
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

  let hasEmail = false;
  if (!!userDetails.email) {
    hasEmail = true;
    delete userDetails.email;
  }

  console.log(hasEmail);

  const defaultAlertMsg = "Error while processing request. Please try again later.";

  const handler = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

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
        let error = '';

        if(!possibleSignups.includes(formData.oauthNickname.value)){
          const { data } = await auth.checkName(formData.oauthNickname.value);
          if (data && data["db-name"] === "ok" && data["blockchain"] === 'ok') {
            error = 'The username already exists. Please use a different username';
          }
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

    if (!!formData.oauthNickname.value) {
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
        if (!possibleSignups.includes(params.name)) {
            await auth.signUp(params);
        }

        storage.remove('opr-force-signup');

        console.log(hasEmail);

        if (hasEmail) {
          const {data} = await auth.logIn({
            name: params.name,
            oauthAccessToken,
          });

          onLogIn({
            name: params.name,
            token: data.eval.privatekey,
          });
        } else {
          onSignUp({ name: params.name });
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

  const onAutoSelect = (e) => {
    const event = {
      target: {
        name: "oauthNickname",
        value: e.target.innerText,
      }
    }
    handler(event);
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
        id="oauthNickname"
        name="oauthNickname"
        options={possibleSignups}
        value={formData.oauthNickname.value}
        onChange={onAutoSelect}
        disableClearable={true}
        fullWidth={true}
        renderInput={(params) => {
          return <TextField
            {...params}
            onChange={handler}
            error={formData.oauthNickname.error.length > 0}
            name="oauthNickname"
            label="Nickname"
            placeholder="Enter a nickname"
            variant="outlined"
            inputProps={{
              ...params.inputProps
            }}
          />
        }}
      />
      <FormHelperText error={formData.oauthNickname.error.length > 0}>
        {formData.oauthNickname.error ? formData.oauthNickname.error : 'Your changes will be public and associated with nickname.'}
      </FormHelperText>
    </div>

    <div className="form-item">
      <TextField
        name="email"
        required={true}
        disabled={formData.email.readonly}
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

    <Button variant="outlined" type="submit" color="primary" disabled={isReady !== true}>Sign Up</Button>
  </form>;
}
