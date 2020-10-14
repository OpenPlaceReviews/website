import React from 'react';
import {Link} from "react-router-dom";

import iconNickname from "../../assets/images/icon-nickname.png";

export default () => {
  return <div className="auth-container" id="opr-app">
    <h1>Login</h1>

    <p>Don't have an account? <Link to="/signup">Create account</Link></p>

    <div className="socialaccount_ballot">
      <p>Select login method:</p>
      <ul className="socialaccount_providers">
        <li>
          <div className="method-auth-nickname">
            <img src={iconNickname} alt="Nickname icon"/>
            <div className="nickname-method" onClick={()=> history.push(`/signup/password`)}>
              Use nickname and password
            </div>
          </div>
        </li>
      </ul>
    </div>

    <form className="login-form" method="POST" action="#">
      <div className="form-item">
        <div>Nickname:</div>
        <div><input name="login" placeholder="Enter your nickname" className="login-form-input" required="true"/></div>
      </div>
      <div className="form-item">
        <div>Password:</div>
        <div><input type="password" name="password" placeholder="Enter strong password" className="login-form-input" required="true"/></div>
        <div className="input-description">We don't save your password, if you loose it, we can't help you get back access to account.</div>
      </div>
      <button className="primaryAction" type="submit">Continue</button>
    </form>
  </div>;
};
