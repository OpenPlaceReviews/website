import React from 'react';
import {Link} from "react-router-dom";

export default () => {
  return <div className="auth-container" id="opr-app">
    <h1>Reset password</h1>

    <p>Change your password on OpenPlaceReviews.org</p>

    <form className="reset-password-form" method="POST" action="#">
      <div className="form-item">
        <div>Current password:</div>
        <div>
          <input name="password" className="sign-form-input" placeholder="Enter strong password" type="password" required="true"/>
        </div>
      </div>
      <br />
      <div className="form-item">
        <div>New password:</div>
        <div>
          <input name="password1" className="login-form-input" placeholder="Enter strong password" type="password" required="true"/>
        </div>
      </div>
      <div className="form-item">
        <div>Repeat new password:</div>
        <div>
          <input name="password2" className="login-form-input" placeholder="Repeat password" type="password" required="true"/>
        </div>
      </div>

      <button className="primaryAction" type="submit">Change password</button><Link to="/signup">Back to Sign-up</Link>
    </form>
  </div>;
};
