import React, {useState, useEffect} from 'react';

import OptionalUserFields from "./blocks/OptionalUserFields";
import TOSBlock from "./blocks/TOSBlock";
import COSBlock from "./blocks/COSBlock";
import auth from "../../api/auth";
import ErrorBlock from "./blocks/ErrorBlock";

export default () => {
  const [formData, setData] = useState({
    name: '',
    email: '',
    pwd: '',
    pwdRepeat: '',
    contribution_terms: false,
    terms_of_service: false,
    languages: [],
    country: '',
  });

  const handler = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    setData( formData => ({ ...formData, [name]: value }));
  };

  const [errorMsg, setError] = useState(null);
  const [isSubmit, setSubmit] = useState(false);

  useEffect(() => {
    if (!formData.pwd.length && !formData.pwdRepeat.length) {
      return;
    }

    if (formData.pwd !== formData.pwdRepeat) {
      setError('Passwords mismatch');
    } else if (formData.pwd.length < 6) {
      setError('Password must be grather then 6 symbols')
    } else {
      setError(null);
    }
  }, [formData.pwd, formData.pwdRepeat]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await auth.checkName(formData.name);
        setError(null);
      } catch (error) {
        if (error.response) {
          setError(error.response.msg);
        } else {
          setError('Error while processing request. Please try again later,');
        }
      }
    };

    if (formData.name) {
      fetchData();
    }
  }, [formData.name]);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        name: formData.name,
        email: formData.email,
        pwd: formData.pwd,
        languages: formData.languages,
        country: formData.country,
      };

      try {
        const result = await auth.signUp(data);
        setError(null);
      } catch (error) {
        if (error.response) {
          setError(error.response.msg);
        } else {
          setError('Error while processing request. Please try again later,');
        }
      }

      setSubmit(false);
    };

    if (isSubmit) {
      fetchData();
    }
  }, [isSubmit]);

  return <form className="signup" method="post" action="#">
    {errorMsg && <ErrorBlock message={errorMsg}/>}

    <div className="form-item">
      <div>Nickname:</div>
      <div>
        <input
          name="name"
          required="true"
          className="login-form-input"
          placeholder="Enter a nickname"
          onChange={handler}
          value={formData.name}
        />
      </div>
    </div>

    <div className="form-item">
      <div>E-mail*:</div>
      <div>
        <input
          name="email"
          required="true"
          className="login-form-input"
          placeholder="Enter email"
          onChange={handler}
          value={formData.email}
        />
      </div>
      <div className="input-description">
        Will not be published to Open Place Reviews and will be only used for system notifications
      </div>
    </div>

      <div className="form-item">
        <div>Password:</div>
        <div>
          <input
            name="pwd"
            className="login-form-input"
            placeholder="Enter strong password"
            type="password"
            required="true"
            onChange={handler}
            value={formData.pwd}
          />
        </div>
      </div>
      <div className="form-item">
        <div>Password (again):</div>
        <div>
          <input
            name="pwdRepeat"
            className="login-form-input"
            placeholder="Repeat password"
            type="password"
            required="true"
            onChange={handler}
            value={formData.pwdRepeat}
          />
        </div>
      </div>

      <COSBlock onChange={handler} isAccept={formData.contribution_terms}/>
      <TOSBlock onChange={handler} isAccept={formData.terms_of_service}/>
      <OptionalUserFields onChange={handler} languages={formData.languages} country={formData.country}/>

      <button type="button" className="btn-blue1" onClick={() => setSubmit(true)}>Sign Up</button>
    </form>;
};
