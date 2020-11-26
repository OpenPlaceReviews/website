import React from 'react';
import iconNickname from "../../../assets/images/icon-nickname.png";
import iconGoogle from "../../../assets/images/icon-google.png";
import iconOSM from "../../../assets/images/icon-osm.png";
import iconGithub from "../../../assets/images/icon-github.png";

export default ({showForm}) => {
  return <div className="socialaccount_ballot">
    <p>Select registration method:</p>
    <ul className="socialaccount_providers">
      <li>
        <div className="method-auth">
          <img src={iconGoogle} alt="Google icon"/>
          <a href="/api/auth/user-oauth-auth?oauthProvider=google">Google</a>
        </div>
      </li>
      <li>
        <div className="method-auth">
          <img src={iconOSM} alt="OpenStreetMap icon"/>
          <a href="/api/auth/user-oauth-auth?oauthProvider=osm">OpenStreetMap</a>
        </div>
      </li>
      <li>
        <div className="method-auth">
          <img src={iconGithub} alt="Github icon"/>
          <a href="/api/auth/user-oauth-auth?oauthProvider=github">Github</a>
        </div>
      </li>
      <li>
        <div className="method-auth-nickname">
          <img src={iconNickname} alt="Nickname icon"/>
          <div className="nickname-method" onClick={showForm}>
            Use nickname and password
          </div>
        </div>
        <div className="help_text">
          For OAuth methods you can add the nickname in the next step, but this will not completely hide your id.
        </div>
      </li>
    </ul>
  </div>;
}
