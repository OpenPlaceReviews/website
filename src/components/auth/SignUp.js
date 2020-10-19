import React, {useState, useContext} from 'react';
import {Link, useHistory} from "react-router-dom";

import iconNickname from "../../assets/images/icon-nickname.png"
import SignUpForm from "./SignUpForm";
import {UserContext} from "../../context";

export default () => {
  const {authData, signUp} = useContext(UserContext);
  const [isFormHidden, setVisibilityForm] = useState(true);
  const history = useHistory();

  const onSignUp = (data) => {
    signUp(data);
    return null;
  };

  if(authData.name && !authData.isVerified) {
    history.push("/profile");
  }

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
          <div className="method-auth-nickname" onClick={()=> setVisibilityForm(true)}>
            <img src={iconNickname} alt="Nickname icon"/>
            <div className="nickname-method">
              Use nickname and password
            </div>
          </div>
        </li>
      </ul>
    </div>

    {isFormHidden && <SignUpForm onSuccess={onSignUp} />}
  </div>;
};
