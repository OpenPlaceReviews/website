import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {TextField, Button} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

import TOSBlock from "./blocks/TOSBlock";
import COSBlock from "./blocks/COSBlock";
import auth from "../../api/auth";

const PASSWORD_MIN_LENGTH = 10;
const TYPING_TIMEOUT = 1000;

let writeTimeout = null;
const SignUpForm = ({onSuccess}) => {
  const [showAlert, setAlert] = useState(null);
  const [isSubmit, setSubmit] = useState(false);
  const [isReady, setReady] = useState(false);

  const [formData, setData] = useState({
    name: {
      value: '',
      error: ''
    },
    email: {
      value: '',
      error: ''
    },
    pwd: {
      value: '',
      error: ''
    },
    pwdRepeat: {
      value: '',
      error: ''
    },
    contribution_terms: {
      value: false,
      error: ''
    },
    terms_of_service: {
      value: false,
      error: ''
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await auth.checkName(formData.name.value);
        let error = '';
        if (data && data["db-name"] === "ok" && data["blockchain"] === 'ok') {
          error = 'Username already inuse';
        }

        setData( formData => ({
          ...formData,
          name: {
            ...formData.name,
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

    if (formData.name.value.length) {
      clearTimeout(writeTimeout);
      writeTimeout = setTimeout(() => {
        fetchData();
      }, TYPING_TIMEOUT);
    }
  }, [formData.name.value]);

  useEffect(() => {
    const pwdValue = formData.pwd.value;
    const pwdRepeatValue = formData.pwdRepeat.value;

    const validatePasswords = () => {
      let pwdError = '';
      let pwdRepeatError = '';

      if (pwdValue.length > 0 && pwdValue.length < PASSWORD_MIN_LENGTH) {
        pwdError = `Password must be greater than ${PASSWORD_MIN_LENGTH} symbols`;
      } else if (pwdRepeatValue.length > 0 && pwdValue !== pwdRepeatValue) {
        pwdError = 'Passwords mismatch';
        pwdRepeatError = 'Passwords mismatch';
      }

      setData( formData => ({
        ...formData,
        pwd: {
          ...formData.pwd,
          error: pwdError,
        },
        pwdRepeat: {
          ...formData.pwdRepeat,
          error: pwdRepeatError,
        }
      }));
    };

    if (pwdValue.length || pwdRepeatValue.length) {
      clearTimeout(writeTimeout);
      writeTimeout = setTimeout(() => {
        validatePasswords();
      }, TYPING_TIMEOUT);
    }
  }, [formData.pwd.value, formData.pwdRepeat.value]);

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
        pwd: formData.pwd.value,
        oauthAccessToken: '',
        userDetails: '',
      };

      try {
        await auth.signUp(params);
        onSuccess({
          name: formData.name.value,
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

  return <form className="signup" autoComplete="off" onSubmit={onSubmit} ref={formRef}>
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
        placeholder="Enter email"
        onChange={handler}
        value={formData.email.value}
        variant="outlined"
        helperText="Will not be published to Open Place Reviews and will be only used for system notifications"
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
        helperText={formData.pwd.error ? formData.pwd.error : ''}
        fullWidth={true}
      />
    </div>

    <div className="form-item">
      <TextField
        name="pwdRepeat"
        label="Password (again)"
        placeholder="Repeat password"
        type="password"
        required={true}
        variant="outlined"
        onChange={handler}
        value={formData.pwdRepeat.value}
        error={(formData.pwdRepeat.error.length > 0)}
        helperText={formData.pwdRepeat.error ? formData.pwdRepeat.error : ''}
        fullWidth={true}
      />
    </div>

    <COSBlock onChange={handler} isAccept={formData.contribution_terms.value}/>
    <TOSBlock onChange={handler} isAccept={formData.terms_of_service.value}/>

    <Button variant="outlined" type="submit" color="primary" disabled={isReady !== true}>Sign Up</Button>
  </form>;
};

SignUpForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default SignUpForm;
