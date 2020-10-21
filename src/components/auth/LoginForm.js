import React, {useEffect, useRef, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

import SignUpForm from "./SignUpForm";

import auth from "../../api/auth";

const LoginForm = ({ onSuccess, oauthParams = {} }) => {
  const [showAlert, setAlert] = useState(null);
  const [isSubmit, setSubmit] = useState(false);
  const [isReady, setReady] = useState(false);
  const [formData, setData] = useState({
    name: {
      value: oauthParams.name || '',
      error: '',
    },
    pwd: {
      value: '',
      error: '',
    }
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

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        name: formData.name.value,
        pwd: formData.pwd.value,
        oauthAccessToken: oauthParams.oauthAccessToken || '',
      };

      try {
        const { data } = await auth.logIn(params);
        onSuccess({
          name: formData.name.value,
          token: data.eval.privatekey,
        });
        return;
      } catch (error) {
        if (error.response && error.response.data){
          setAlert(error.response.data.message);
        } else {
          setAlert(defaultAlertMsg);
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

  return <form className="login-form" autoComplete="off" onSubmit={onSubmit} ref={formRef}>
    {showAlert && <Alert
      className="form-alert"
      severity="error"
      onClose={() => setAlert(null)}>
      {showAlert}
    </Alert>}

    <div className="form-item">
      <TextField
        name="name"
        label="Nickname"
        placeholder="Enter your nickname"
        required={true}
        variant="outlined"
        onChange={handler}
        value={formData.name.value}
        error={(formData.name.error.length > 0)}
        helperText={formData.name.error ? formData.name.error : ''}
        fullWidth={true}
      />
    </div>
    <div className="form-item">
      <TextField
        name="pwd"
        label="Password"
        placeholder="Enter strong password"
        type="password"
        required={true}
        variant="outlined"
        onChange={handler}
        value={formData.pwd.value}
        error={(formData.pwd.error.length > 0)}
        helperText={formData.pwd.error ? formData.pwd.error : 'We don\'t save your password, if you loose it, we can\'t help you get back access to account.'}
        fullWidth={true}
      />
    </div>
    <Button variant="outlined" type="submit" color="primary" disabled={isReady !== true}>Continue</Button>
  </form>;
};

SignUpForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default LoginForm;
