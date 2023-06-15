import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import AuthContext from "../main/auth/providers/AuthContext";

import openPlaceReviewLogo from "../../assets/images/OpenPlaceReview.svg";
import avatarDefault from "../../assets/images/avatar-default.png";

const UserMenuFragment = ({isLoggedIn, logOut}) => {
  const onclickLogout = (e) => {
    e.preventDefault();
    logOut();
  };

  if(!isLoggedIn) {
    return <>
      <li className="nav_login">
        <NavLink to={"/login"}>Login</NavLink>
      </li>
      <li className="nav_signup">
        <NavLink to={"/signup"}>Sign Up</NavLink>
      </li>
      <div></div>
    </>;
  } else {
    return <>
      <li className="my_account">
        <a href="#" onClick={onclickLogout}>Logout</a>
      </li>
      <li className="avatar_my_account">
        <NavLink to={"/profile"}><img src={avatarDefault} alt="default avatar"/></NavLink>
      </li>
    </>;
  }
};

export default function Header() {
  const {authData, logOut} = useContext(AuthContext);
  const history = useHistory();

  const onLogOut = () => {
    logOut();
    history.push('/');
  };

  return <>
    <header>
      <div className="block-header">
        <div className="logo">
          <NavLink exact to="/">
            <img src={openPlaceReviewLogo} alt="OpenPlaceReviews.org logo" className="center" />
          </NavLink>
        </div>

        <label className="toggle-container" htmlFor="toggle">
          <span className="button button-toggle"></span>
        </label>
        <nav className="nav">
          <ul>
            <li><NavLink to={"/intro"}>Intro</NavLink></li>
            <li><NavLink to={"/map"}>Map</NavLink></li>
            <li><NavLink to={"/data/blocks"} exact>Blockchain</NavLink></li>
            <UserMenuFragment isLoggedIn={authData.name && authData.name.length} logOut={onLogOut}/>
          </ul>
        </nav>
      </div>
    </header>
  </>;
};
