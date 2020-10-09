import React from 'react';
import {NavLink} from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";

export default () => {
  return <div>
    <Header/>

    <div className="auth-container" id="opr-app">
      <h1>Login</h1>

      <p>Don't have an account? <NavLink to="/signup">Create account</NavLink></p>
      <form className="login-form form-hidden" method="POST" action="#">
        <div className="form-item">
          <div>Nickname:</div>
          <div><input name="form.login.html_name" placeholder="Enter your nickname" className="login-form-input" required="true"/></div>
        </div>
        <div className="form-item">
          <div>Password:</div>
          <div><input type="password" name="form.password.html_name" placeholder="Enter strong password" className="login-form-input" required="true"/></div>
          <div className="input-description">We don't save your password, if you loose it, we can't help you get back access to account.</div>
        </div>
        <button className="primaryAction" type="submit">Continue</button>
      </form>
    </div>

    <Footer/>
  </div>;
};
