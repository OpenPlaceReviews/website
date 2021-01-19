import React, {useEffect, useState} from "react";

import qs from "qs";
import auth from "../../../../../api/auth";

import useForm from "./hooks/useForm";
import useValidate from "./hooks/useValidate";

import {Link} from "react-router-dom";
import FormItem from "./blocks/FormItem";
import FormTextField from "./blocks/FormTextFiels";
import SubmitButton from "./blocks/SumbitButton";
import FormAlert from "./blocks/FormAlert";
import Form from "./blocks/Form";

export default function LoginForm({ onSuccess }) {
  const reqParams = qs.parse(location.search.substring(1));
  const [state, setState] = useState({
    submitted: false,
    alert: '',
  });
  const [error, setError] = useState(null);
  const {formData, valid, setValid, handler} = useForm({
    name: {
      value: '',
      required: true,
      error: '',
    },
    pwd: {
      value: '',
      required: true,
      error: '',
    }
  });

  const {submitted, alert} = state;

  const validate = useValidate();

  useEffect(() => {
    const result = validate(formData);
    setValid(result);
  }, [formData]);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        name: formData.name.value,
        pwd: formData.pwd.value,
      };

      let result;
      try {
        result = await auth.logIn(params, reqParams);
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

      onSuccess({
        name: formData.name.value,
        provider: result.data.create[0].id[1],
        token: result.data.eval.privatekey,
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

  const forgetPwdText = <React.Fragment>
    If you forget your password, please follow the <Link to={"/reset-password"}>link</Link> to reset it.
  </React.Fragment>;

  return <Form submitted={submitted} onSubmit={onSubmit}>
    <FormAlert open={!!alert} onClose={() => setState((state) => ({...state, alert: ''}))}>{alert}</FormAlert>
    <FormItem disabled={submitted}>
      <FormTextField
          name="name"
          label="Nickname"
          placeholder="Enter your nickname"
          required={formData.name.required}
          onChange={handler}
          disabled={submitted}
          value={formData.name.value}
          error={formData.name.error}
          helperText=''
      />
    </FormItem>
    <FormItem>
      <FormTextField
          name="pwd"
          label="Password"
          placeholder="Enter strong password"
          type="password"
          required={formData.pwd.required}
          onChange={handler}
          disabled={submitted}
          helperText={forgetPwdText}
          value={formData.pwd.value}
          error={formData.pwd.error}
      />
    </FormItem>

    <SubmitButton onClick={onSubmit} disabled={!valid || submitted}>Continue</SubmitButton>
  </Form>;
};
