import React, {useEffect, useState} from "react";
import auth from "../../../api/auth";
import {Link} from "react-router-dom";
import FormItem from "./blocks/forms/FormItem";
import FormTextField from "./blocks/forms/FormTextFiels";
import SubmitButton from "./blocks/forms/SumbitButton";
import FormAlert from "./blocks/forms/FormAlert";
import useForm from "./blocks/forms/hooks/useForm";

export default function LoginForm({ onSuccess, reqParams }) {
  const {state, setState} = useState({
    submitted: false,
    alert: '',
  });
  const [error, setError] = useState(null);
  const {formData, valid, handler, formRef} = useForm({
    name: {
      value: '',
      error: '',
    },
    pwd: {
      value: '',
      error: '',
    }
  });

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
        token: result.data.eval.privatekey,
      });
    };

    if (state.submitted) {
      fetchData();
    }
  }, [state.submitted]);

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

  return <form className="login-form" autoComplete="off" onSubmit={onSubmit} ref={formRef}>
    <FormAlert open={!!alert}>{alert}</FormAlert>
    <FormItem>
      <FormTextField
          name="name"
          label="Nickname"
          placeholder="Enter your nickname"
          required={true}
          onChange={handler}
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
          required={true}
          onChange={handler}
          helperText={forgetPwdText}
          value={formData.pwd.value}
          error={formData.pwd.error}
      />
    </FormItem>
    <SubmitButton disabled={!valid || state.submitted} onClick={onSubmit}>Continue</SubmitButton>
  </form>;
};
