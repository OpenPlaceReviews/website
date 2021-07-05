import React from "react";
import {Link} from "react-router-dom";

import githubLogo from "../../assets/images/openness_github.png";
import openDBLogo from "../../assets/images/openness_opendb.png";
import monetizationImg from "../../assets/images/monetization.png";

import Expand from "../blocks/misc/Expand";

export default function LandingPage() {
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
          We are inspired by truly open crowdsource projects like
          <a href="https://www.openstreetmap.org" target="_blank">OpenStreetMap</a> and <a
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
    <div className="border-screen2">&nbsp;</div>
    <div className="third-screen">
      <h1>Community driven</h1>
      <p>Build a community to make key decisions about data<br/>structure and moderation together.</p>
      <a href="https://t.me/openplacereviews" target="_blank">Discuss on Telegram</a>
      <div className="flex_conteiner">
        <div className="left_clmn">
          <h2>Register &amp; Update places</h2>
          <p>Register new places, update information about them and link to other web sources about these places</p>
          <h2>Define Tagging &amp; Metadata</h2>
          <p>Vote and make decisions about tagging principles of places and reviews</p>
        </div>
        <div className="right_clmn">
          <h2>Sync with Public Sources</h2>
          <p>Connect places to public source of information including OpenStreetMap, Wikipedia, blogs, websites and
            let crawlers keep information up to date</p>
          <h2>Detect fraud, spam and vandalism</h2>
          <p>Develop and decide on tools to detect non-desirable reviews</p>
        </div>
      </div>
    </div>
    <div className="fourth-screen">
      <div className="border_screen4">&nbsp;</div>
      <div className="decentralization">
        <h1>Decentralization</h1>
        <div className="flex_conteiner">
          <div>Develop a decentralized system from the day 1 to avoid scalability issues in the future.</div>
          <div>
            <Link to="/data">Blockchain and data explorer</Link><br/>
            <a href="https://forum.openplacereviews.org/t/blockchain-opendb-kickoff/64">Project Abstract</a><br/>
            <a href="https://github.com/OpenPlaceReviews/">GitHub Repo</a>
          </div>
        </div>
      </div>
    </div>
    <div className="fifth-screen">
      <div className="trust">
        <h1>Trust</h1>
        <div className="flex_conteiner">
          <div>
            <p>Keep all the data open to prevent any data manipulation. Data is stored in a blockchain form, so it is
              transparent for any changes.</p>
            <p><Link to="/data">Blockchain explorer</Link></p>
          </div>
          <div>
            <p>With appropriate data tagging let applications and users decide how to display the data to avoid
              monopoly on decisions</p>
          </div>
        </div>
      </div>
    </div>
    <div className="sixth-screen">
      <div className="asoftoday">
        <h1>As of Today</h1>
        <div className="flex_conteiner">
          <div>
            <p>As of today we are here:</p>
            <p>- Synchronize places such as hotels and restaurants with OpenStreetMap and maintain permanent id (OpenPlaceReviews id).</p>
            <p>- Allow to upload pictures for places (outdoor, indoor, menu). Available via <a href="https://osmand.net">OsmAnd</a>.</p>
            <p>- Invite to moderate uploaded pictures. Available on the website  for <a href="https://openplacereviews.org/login">logged in users</a>.</p>
            <p>- Invite to help to review whether place was closed, renamed or refreshed, so reviews and pictures could be preserved. Available on the website .</p>
            <p>- Invite to attach Trip Advisor id to the places. Available on the website.</p>
          </div>
          <div>
            <p>Nearest plans:</p>
            <p>- Sync rating with Trip Advisor.</p>
            <p>- Extend places database to touristic amenities such as viewpoints, castles, monuments, etc.</p>
            <p>- Allow to add review places and build favorites lists for registered users.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="expand-block">
      <div className="mission_container">
        <div className="mission_block">
          <h1 id="mission">Mission</h1>
          <p>
            Big commercial companies collect millions of user reviews worldwide via all
            possible ways and make huge money on it. Sometimes they manipulate them in
            advertisers interest. None of them wants these data to be open and available
            for everyone. The amount of data they collect leads to global privacy issues.
            They create a monopoly on something that should belong to users.
          </p>

          <p>
            We’ve seen this already with…<br />
            … world knowledge monopoly: thus Wikipedia.org was born.<br />
            … world map data monopoly: thus OpenStreetMap.org was born.
          </p>
          <Expand>
            <p>
              With all these open projects the world became more open, transparent and better.
              Now it is time for users reviews. The world is waiting for OpenPlaceReviews.org to be born.
            </p>
            <p>
              We believe that any information provided by users could not be collected in any
              hidden form and should be available for further distribution.
            </p>
            <p>
              We are inspired by truly open crowdsource projects like OpenStreetMap and
              Wikipedia and as a first step we want to build a platform to leave reviews for
              restaurants, hotels, attractions, etc.  We are developers of popular mobile maps
              application and we know how to do it.
            </p>
            <p>
              Join our community and share your feedback. Let's make the world a better place to live!
            </p>
            <p>
              ------<br />
              Here’s our mission and what we stand for:<br />
              Openness that leads to transparency and trustworthy<br />
              Collaborativeness that leads to quality
            </p>
          </Expand>
        </div>
      </div>
    </div>
  </div>;
};
