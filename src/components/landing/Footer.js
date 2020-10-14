import React from "react";
import {NavLink} from "react-router-dom";

import openPlaceReviewLogo from "../../assets/images/OpenPlaceReview.svg";

export default () => {
  return <footer>
    <div className="container_flex footer-container">
      <div className="copyright">
        <img src={openPlaceReviewLogo} alt="OpenPlaceReviews.org logo" />
        <div>© 2020 OpenPlaceReviews.org</div>
      </div>
      <div className="contact">
        <h2>Contact Us</h2>
        <ul>
          <li><a href="mailto:hello@openplacereviews.org">hello@openplacereviews.org</a></li>
        </ul>
      </div>
      <div className="about">
        <h2>About</h2>
        <ul>
          <li><a className="gray" href="/api/admin">Blockchain explorer</a></li>
          <li><a href="https://github.com/OpenPlaceReviews/">GitHub</a></li>
        </ul>
      </div>
      <div className="community">
        <h2>Community</h2>
        <ul>
          <li><a href="https://forum.openplacereviews.org/">Forum</a></li>
          <li><a href="https://t.me/openplacereviews">Telegram channel</a></li>
        </ul>
      </div>
    </div>
  </footer>;
};
