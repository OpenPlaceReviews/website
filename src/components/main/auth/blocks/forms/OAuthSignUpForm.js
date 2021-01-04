import React, {useState, useEffect, useRef} from 'react';

import auth from "../../../../../api/auth";

import useForm from "./hooks/useForm";
import useTypingTimeout from "./hooks/useTypingTimeout";
import useValidateUsername from "./hooks/useValidateUsername";
import useValidate from "./hooks/useValidate";

import OptionalUserFields from "./blocks/OptionalUserFields";
import FormAlert from "./blocks/FormAlert";
import FormItem from "./blocks/FormItem";
import FormTextField from "./blocks/FormTextFiels";
import SubmitButton from "./blocks/SumbitButton";
import Form from "./blocks/Form";
import Agreement from "./blocks/Agreement";

import COSHtml from "../../../../../assets/agreement/contributor_terms.html";
import TOSHtml from "../../../../../assets/agreement/terms_of_service.html";

export default function OAuthSignUpForm({onSignUp, onLogin, onError, preAuthParams}) {
  const {userDetails, accessToken, oauthNickname, possibleSignups} = preAuthParams;

  let providedEmail = '';
  if (!!userDetails.email) {
    providedEmail = userDetails.email;
    delete userDetails.email;
  }

  const [state, setState] = useState({
    submitted: false,
    alert: '',
  });
  const [error, setError] = useState(null);
  const {formData, valid, setValid, handler, setData} = useForm({
    name: {
      value: oauthNickname,
      required: true,
      error: ''
    },
    email: {
      value: providedEmail,
      required: true,
      error: ''
    },
    contributor_terms: {
      value: false,
      required: true,
      error: ''
    },
    terms_of_service: {
      value: false,
      required: true,
      error: ''
    },
    languages: {
      value: [],
      error: ''
    },
    country: {
      value: '',
      error: '',
    }
  });

  const {submitted, alert} = state;
  const writeTimeout = useRef();

  const validate = useValidate();
  const typingTimeout = useTypingTimeout(writeTimeout);
  const validateUsername = useValidateUsername();

  useEffect(() => {
    const result = validate(formData);
    setValid(result);
  }, [formData]);

  useEffect(() => {
    const onCheck = (error) => {
      if(error) {
        const newData = {...formData};
        newData.name.error = error;
        setData(newData);
      }
    };

    if(!possibleSignups.includes(formData.name.value)) {
      typingTimeout(() => {
        validateUsername(formData.name.value, onCheck, setError);
      });
    }
  }, [formData.name.value]);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      let callBack;
      const isExistingNickname = possibleSignups.includes(formData.name.value);
      if (!isExistingNickname) {
        const params = {
          name: formData.name.value,
          email: formData.email.value,
          userDetails: {
            ...userDetails,
            languages: formData.languages.value,
            country: formData.country.value,
          },
          oauthAccessToken: accessToken,
        };

        try {
          result = await auth.signUp(params)
          callBack = onSignUp;

          if (!result.data || !result.data.create) {
            const error = new Error('Wrong server answer. No objects created.');
            setError(error);
            return;
          }
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
        }
      } else {
        const params = {
          name: formData.name.value,
          oauthAccessToken: accessToken,
        }

        try {
          result = await auth.logIn(params);
          callBack = onLogin;
        } catch (error) {
          if (error.response) {
            const {
              data: { message },
            } = error.response;

            onError(message);
            return;
          }

          setError(error);
        }
      }

      const {data} = result;
      callBack({
        name: formData.name.value,
        token: data.eval.privatekey,
      });
    };

    if (submitted) {
      fetchData();
    }
  }, [submitted]);

  if (error) {
    throw error;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setState({alert: '', submitted: true});
  };

  const onAutoSelect = (e) => {
    const event = {
      target: {
        name: "name",
        value: e.target.innerText,
      }
    }
    handler(event);
  };

  return <Form onSubmit={onSubmit} submitted={submitted}>
    <FormAlert open={!!alert} onClose={() => setState((state) => ({...state, alert: ''}))}>{alert}</FormAlert>

    <FormItem disabled={submitted}>
      <Autocomplete
          freeSolo
          id="name"
          name="name"
          options={possibleSignups}
          value={formData.name.value}
          onChange={onAutoSelect}
          disableClearable={true}
          fullWidth={true}
          renderInput={(params) => {
            return <TextField
                {...params}
                onChange={handler}
                error={formData.name.error.length > 0}
                name="name"
                label="Nickname"
                required={true}
                placeholder="Enter a nickname"
                variant="outlined"
                inputProps={{
                  ...params.inputProps
                }}
            />
          }}
      />
      <FormHelperText error={formData.name.error.length > 0}>
        {formData.name.error ? formData.name.error : 'Your changes will be public and associated with nickname.'}
      </FormHelperText>
    </FormItem>

    <FormItem disabled={submitted}>
      <FormTextField
          name="email"
          required={formData.email.required}
          label="E-mail"
          placeholder="Enter email"
          onChange={handler}
          value={formData.email.value}
          helperText="Will not be published to Open Place Reviews and will be only used for system notifications"
      />
    </FormItem>

    <Agreement
        checked={formData.contributor_terms.value}
        error={formData.contributor_terms.error}
        disabled={submitted}
        html={COSHtml}
        name="contributor_terms"
        title="Contributor Terms"
        link="../../../../../assets/agreement/contributor_terms.html"
        onChange={handler}
    />
    <Agreement
        checked={formData.terms_of_service.value}
        error={formData.terms_of_service.error}
        disabled={submitted}
        html={TOSHtml}
        name="terms_of_service"
        title="Terms of service"
        link="../../../../../assets/agreement/terms_of_service.html"
        onChange={handler}
    />

    <OptionalUserFields
        onChange={handler}
        languages={formData.languages}
        country={formData.country}
    />

    <SubmitButton onClick={onSubmit} disabled={!valid || submitted}>Sign Up</SubmitButton>
  </Form>;
};