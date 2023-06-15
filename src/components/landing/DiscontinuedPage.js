import React from "react";
import { Link } from "react-router-dom";

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
                ❌❌❌ The project has been discontinued at June 2023 ❌❌❌
                <p>Read more about origin goal and <a href="/intro">mission</a>.</p>
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
        <h1>Thank you for supporting us.</h1>
        <p>
          Our original mission was to create an open API project that every map application could contribute to, similar to OpenStreetMap. Even though we've created infrastructure, a review process, bots, and an API, only OsmAnd Android has used the integration point. However, due to the very sophisticated setup as a Public Blockchain, it took too many resources to maintain, and the project has been discontinued.
        </p>
        <p><a href="/backup/">The contributed data</a> (~4000 uploaded images on IPFS) to the project and the <a href="/data">blockchain metadata</a> will be available under <b>Public Domain license</b> for the next 3 months.</p>
        <p>The main result of the project is the OpenDB blockchain that stores and processes a lot of information and provides SQL database access with indexes - <b><a href="https://github.com/OpenPlaceReviews/opendb" target="_blank">OpenDB GitHub</a></b>. The blockchain serves the purpose of a Public API, including replication, and guarantees openness for everybody. The SQL database provides full access to process 10M objects in a reasonable time.</p>
        <p>As an alternative project, we recommend looking at <a href="https://mangrove.reviews/" target="_blank">Mangrove reviews</a>, which has shown sustainable growth in recent years.</p>
      </div>
      <div className="openness_imgs">
        <div className="openness_github">
          <img src={githubLogo} alt="GitHub" />
          <a href="https://github.com/OpenPlaceReviews/" target="_blank">GitHub</a>
        </div>
        <div className="openness_open_db">
          <img src={openDBLogo} alt="Opendb" />
          <Link to="/data">Open Database</Link>
        </div>
      </div>
    </div>
  </div>;
};
