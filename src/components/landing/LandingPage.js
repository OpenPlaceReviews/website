import React from "react";
import {Link} from "react-router-dom";

import githubLogo from "../../assets/images/openness_github.png";
import openDBLogo from "../../assets/images/openness_opendb.png";

export default function DiscontinuedPage() {
  return <div>

    <div className="first-screen">
      <div className="first-screen-bg">
        <div className="left-line"></div>
        <div className="header-body">
          <div className="first-screen-container">
            <div className="container_flex">
              <h1>
                Read, share and manage information about local places
                <p>Open. Collaborative. Decentralized.</p>
              </h1>

              <div className="header-emoji">
                <span>☕</span>
                <span>🍽</span>
                <span>🍷</span>
                <span>🛌</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-left"></div>
        <div className="bottom-line"></div>
        <div className="bottom-center"></div>
        <div className="bottom-line"></div>
      </div>

    </div>

    <div className="second-screen">
      <div>
        <h1>Openness</h1>
        <p>
          We believe that information provided by users should not be collected in
          any hidden way with a privacy respect and should be available for everyone
          for any possible usage.
        </p>
        <p>
          We are inspired by truly open crowdsource projects like <a href="https://www.openstreetmap.org" target="_blank">OpenStreetMap</a> and <a
          href="https://www.wikipedia.org/" target="_blank">Wikipedia</a> and we want to make a similar platform for
          User Generated Content.</p>
        <p>As a first step we want to build a platform to store user reviews for restaurants, hotels, attractions,
          museums and other local places.</p>
      </div>
      <div className="openness_imgs">
        <div className="openness_github">
          <img src={githubLogo} alt="GitHub"/>
          <a href="https://github.com/OpenPlaceReviews/" target="_blank">GitHub</a>
        </div>
        <div className="openness_open_db">
          <img src={openDBLogo} alt="Opendb"/>
          <Link to="/data">Open Database</Link>
        </div>
      </div>
    </div>
  </div>;
};
