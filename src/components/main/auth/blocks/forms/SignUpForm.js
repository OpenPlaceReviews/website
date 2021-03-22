import React, {useState, useEffect, useRef} from 'react';
import qs from "qs";

import auth from "../../../../../api/auth";

import useForm from "./hooks/useForm";
import useTypingTimeout from "./hooks/useTypingTimeout";
import useValidatePasswords from "./hooks/useValidatePasswords";
import useValidateUsername from "./hooks/useValidateUsername";

import OptionalUserFields from "./blocks/OptionalUserFields";
import FormAlert from "./blocks/FormAlert";
import FormItem from "./blocks/FormItem";
import FormTextField from "./blocks/FormTextFiels";
import SubmitButton from "./blocks/SumbitButton";
import Form from "./blocks/Form";
import Agreement from "./blocks/Agreement";

import COSHtml from "../../../../../assets/agreement/contributor_terms.html";
import TOSHtml from "../../../../../assets/agreement/terms_of_service.html";
import useValidate from "./hooks/useValidate";

export default function SignUpForm({onSuccess}) {
  const reqParams = qs.parse(location.search.substring(1));
  const [state, setState] = useState({
    submitted: false,
    alert: '',
  });
  const [error, setError] = useState(null);
  const {formData, valid, setValid, handler, setData} = useForm({
    name: {
      value: '',
      required: true,
      error: ''
    },
    email: {
      value: '',
      required: true,
      error: ''
    },
    pwd: {
      value: '',
      required: true,
      error: ''
    },
    pwdRepeat: {
      value: '',
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
  const validatePasswords = useValidatePasswords();
  const validateUsername = useValidateUsername();

  useEffect(() => {
    const result = validate(formData);
    setValid(result);
  }, [formData]);

  useEffect(() => {
    typingTimeout(() => {
      const errors = validatePasswords(formData.pwd.value, formData.pwdRepeat.value);
      if (errors.pwd || errors.pwdRepeat) {
        const newData = {...formData};
        if (errors.pwd) {
          newData.pwd.error = errors.pwd;
        }
        if (errors.pwdRepeat) {
          newData.pwdRepeat.error = errors.pwdRepeat;
        }
        setData(newData);
      }
    });
  }, [formData.pwd.value, formData.pwdRepeat.value]);

  useEffect(() => {
    const onCheck = (error) => {
      if(error) {
        const newData = {...formData};
        newData.name.error = error;
        setData(newData);
      }
    };

    typingTimeout(() => {
      validateUsername(formData.name.value, onCheck, setError);
    })
  }, [formData.name.value]);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        name: formData.name.value,
        email: formData.email.value,
        pwd: formData.pwd.value,
        oauthAccessToken: '',
        userDetails: {
          languages: formData.languages.value,
          country: formData.country.value,
        },
      };

      try {
        await auth.signUp(params, reqParams);
        onSuccess({ name: formData.name.value });
      } catch (error) {
        let errorMessage = 'Wrong server answer';
        if (error.response) {
          const {
            data: { message },
          } = error.response;
          errorMessage = message;
        }
        setState({
          submitted: false,
          alert: errorMessage,
        });
      }
    };

    if (submitted) {
      fetchData();
    }
  }, [submitted]);

  const onSubmit = (e) => {
    e.preventDefault();
    setState({alert: '', submitted: true});
  };

  if (error) {
    throw error;
  }

  return <Form onSubmit={onSubmit} submitted={submitted}>
    <FormAlert open={!!alert} onClose={() => setState((state) => ({...state, alert: ''}))}>{alert}</FormAlert>

    <FormItem disabled={submitted}>
      <FormTextField
        name="name"
        required={formData.name.required}
        label="Nickname"
        placeholder="Enter a nickname"
        onChange={handler}
        value={formData.name.value}
        error={formData.name.error}
        helperText="Username is public"
      />
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

    <FormItem disabled={submitted}>
      <FormTextField
        name="pwd"
        label="Password"
        placeholder="Enter strong password"
        type="password"
        required={formData.pwd.required}
        onChange={handler}
        value={formData.pwd.value}
        error={formData.pwd.error}
        helperText=""
      />
    </FormItem>

    <FormItem disabled={submitted}>
      <FormTextField
        name="pwdRepeat"
        label="Password (again)"
        placeholder="Repeat password"
        type="password"
        required={formData.pwdRepeat.required}
        onChange={handler}
        value={formData.pwdRepeat.value}
        error={formData.pwdRepeat.error}
        helperText=""
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