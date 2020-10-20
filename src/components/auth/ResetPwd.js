import React, {useEffect, useRef, useState} from 'react';
import auth from "../../api/auth";
import Alert from "@material-ui/lab/Alert";
import {Button, TextField} from "@material-ui/core";

export default () => {
  const [showAlert, setAlert] = useState(null);
  const [isSubmit, setSubmit] = useState(false);
  const [isReady, setReady] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const [formData, setData] = useState({
    name: {
      value: '',
      error: ''
    },
    email: {
      value: '',
      error: ''
    },
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
        email: formData.email.value,
      };

      try {
        await auth.resetPwd(params);
        setSuccess(true);
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

  if (isSuccess) {
    return <div className="auth-container" id="opr-app">
      <h1>Reset password</h1>
      <p>Please check your email to reset password.</p>
    </div>;
  }

  return <div className="auth-container" id="opr-app">
    <h1>Reset password</h1>

    <p>Change your password on OpenPlaceReviews.org</p>

    <form className="reset-password-form" autoComplete="off" onSubmit={onSubmit} ref={formRef}>
      {showAlert && <Alert
        className="form-alert"
        severity="error"
        onClose={() => setAlert(null)}>
        {showAlert}
      </Alert>}

      <div className="form-item">
        <TextField
          name="name"
          required={true}
          label="Nickname"
          placeholder="Enter a nickname"
          onChange={handler}
          value={formData.name.value}
          error={formData.name.error.length > 0}
          helperText={formData.name.error ? formData.name.error : ''}
          variant="outlined"
          fullWidth={true}
        />
      </div>

      <div className="form-item">
        <TextField
          name="email"
          required={true}
          label="E-mail"
          placeholder="Enter a e-mail"
          onChange={handler}
          value={formData.email.value}
          error={formData.email.error.length > 0}
          helperText={formData.email.error ? formData.email.error : ''}
          variant="outlined"
          fullWidth={true}
        />
      </div>

      <Button variant="outlined" type="submit" color="primary" disabled={isReady !== true}>Send</Button>
    </form>
  </div>;
};
