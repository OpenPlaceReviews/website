import React from 'react';

import Expand from "../misc/Expand";
import OptionalUserFields from "./OptionalUserFields";
import TOSHtml from "../../assets/legacy/contributor_terms.html";
import PropTypes from "prop-types";
import TOSBlock from "./TOSBlock";
import COSBlock from "./COSBlock";

const signUpForm = ({isHidden}) => {
  let className = "signup";
  if (isHidden) {
    className += " form-hidden";
  }

  return <form className={className} method="post" action="#">
    <div className="form-item">
      <div>Nickname:</div>
      <div>
        <input name="username" required="true" className="login-form-input" placeholder="Enter a nickname"/>
      </div>
    </div>

    <div className="form-item">
      <div>E-mail*:</div>
      <div>
        <input name="email" required="true" className="login-form-input" placeholder="Enter email" />
      </div>
      <div className="input-description">
        Will not be published to Open Place Reviews and will be only used for system notifications
      </div>
    </div>

      <div className="form-item">
        <div>Password:</div>
        <div>
          <input name="password1" className="login-form-input" placeholder="Enter strong password" type="password" required="true"/>
        </div>
      </div>
      <div className="form-item">
        <div>Password (again):</div>
        <div>
          <input name="password2" className="login-form-input" placeholder="Repeat password" type="password" required="true"/>
        </div>
      </div>

      <COSBlock/>
      <TOSBlock/>
      <OptionalUserFields/>

      <button type="submit" className="btn-blue1">Sign Up</button>
    </form>;
};

signUpForm.propTypes = {
  isHidden: PropTypes.bool.isRequired,
};

export default signUpForm;
