import React from 'react';
import {Link} from "react-router-dom";

import openPlaceReviewLogo from "../../assets/images/OpenPlaceReview.svg";

export default () => {
  return <div className="header">
    <div className="logo">
      <Link to="/">
        <img src={openPlaceReviewLogo} alt="OpenPlaceReviews.org logo" />
      </Link>
    </div>
    <ul className="menu-landing">
      <li><a href="#mission">Mission</a></li>
    </ul>
  </div>;
};
