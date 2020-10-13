import React, {useState} from 'react';
import {Link} from "react-router-dom";

import iconNickname from "../../assets/images/icon-nickname.png"
import SignUpForm from "./SignUpForm";

export default () => {
  const [isFormHidden, setVisibilityForm] = useState(true);

  return <div className="auth-container" id="opr-app">
    <h1>Sign Up</h1>

    <p>
      OpenPlaceReviews has a public database, so we do not store any private data.
      You can select a nickname and it will be visible to everyone.<br />
      Already have an account? Then please <Link to="/login">Login</Link>.
    </p>

    <div className="socialaccount_ballot">
      <p>Select sign up method:</p>
      <ul className="socialaccount_providers">
        <li>
          <div className="method-auth-nickname">
            <img src={iconNickname} alt="Nickname icon"/>
            <div className="nickname-method" onClick={()=> {
              if(isFormHidden) setVisibilityForm(false);
            }}>
              Use nickname and password
            </div>
          </div>
        </li>
      </ul>
    </div>

    <SignUpForm isHidden={isFormHidden}/>
  </div>;
};
