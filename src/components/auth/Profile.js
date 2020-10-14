import React from 'react';

import OptionalUserFields from "./blocks/OptionalUserFields";
import TOSBlock from "./blocks/TOSBlock";
import COSBlock from "./blocks/COSBlock";

export default ({user}) => {
  return <div className="auth-container" id="opr-app">
    <h1>
      <div className="oauth_avatar">
        <img src="../../assets/images/avatar-default.png" alt="Default avatar"/>
      </div>
      Welcome, { user.username }!
    </h1>

    <form className="signup" method="post" action="#">

      <div className="form-item">
        <div>Nickname:</div>
        <div>
          <input name="username" required="true" className="login-form-input" placeholder="Enter a nickname"/>
        </div>
      </div>

      <div className="form-item">
        <div>E-mail*:</div>
        <div><input name="email" required="required" className="login-form-input" placeholder="Enter email"/></div>
        <div className="input-description">
          Will not be published to Open Place Reviews and will be only used for system notifications
        </div>
      </div>

      <COSBlock/>
      <TOSBlock/>
      <OptionalUserFields/>

      <button type="submit" className="btn-blue1">"Update"</button>
    </form>
  </div>;
};
