import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {UserContext} from "../context";

import openPlaceReviewLogo from "../assets/images/OpenPlaceReview.svg";
import avatarDefault from "../assets/images/avatar-default.png";

const UserMenuFragment = ({isLoggedIn, logOut}) => {
  const onclickLogout = (e) => {
    e.preventDefault();
    logOut();
  };

  if(!isLoggedIn) {
    return <>
      <li className="nav_login">
        <NavLink to="/login">Login</NavLink>
      </li>
      <li className="nav_signup">
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
      <div></div>
    </>;
  } else {
    return <>
      <li className="my_account">
        <a href="#" onClick={onclickLogout}>Logout</a>
      </li>
      <li className="avatar_my_account">
        <NavLink to="/profile"><img src={avatarDefault} alt="default avatar"/></NavLink>
      </li>
    </>;
  }
};

export default () => {
  const {authData, logOut} = useContext(UserContext);

  return <>
    <header>
      <div className="block-header">
        <div className="logo">
          <NavLink to="/">
            <img src={openPlaceReviewLogo} alt="OpenPlaceReviews.org logo" className="center" />
          </NavLink>
        </div>

        <label className="toggle-container" htmlFor="toggle">
          <span className="button button-toggle"></span>
        </label>
        <nav className="nav">
          <ul>
            <li><a href="/map.html">Map</a></li>
            <li><a href="/api/admin">Blockchain</a></li>
            {/*
          <li><a href="#">Leaderboard</a></li>
          <li><a href="#">News</a></li>
          <li><a href="#">Docs</a></li>
          <li><a href="#">Tasks</a></li>
          <li><NavLink to="/investing">For Investors</NavLink></li>
          */}
            <UserMenuFragment isLoggedIn={authData.name && authData.name.length} logOut={logOut}/>
          </ul>
        </nav>
      </div>
    </header>
  </>;
};
