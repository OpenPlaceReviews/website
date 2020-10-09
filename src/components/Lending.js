import React from "react";

import Footer from "./landing/Footer";
import Header from "./Header";
import Mission from "./landing/Mission";

import victorShcherbPhoto from "../assets/images/victor_shcherb.png";
import evgeneLisovskyPhoto from "../assets/images/evgene_lisovsky.png";
import githubLogo from "../assets/images/openness_github.png";
import openDBLogo from "../assets/images/openness_opendb.png";
import monetizationImg from "../assets/images/monetization.png";



export default () => {
  return <div className="landing-container" id="opr-app">
    <Header/>

    <div className="first-screen">
      <div className="first-screen-bg">
        <div className="left-line"></div>
        <div className="header-body">
          <div className="first-screen-container">
            <div className="container_flex">
              <h1>
                Read, share and manage reviews about local places
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
          <a href="#">Open Database</a>
        </div>
      </div>
    </div>
    <div className="border-screen2">&nbsp;</div>
    <div className="third-screen">
      <h1>Community driven</h1>
      <p>Build a community to make key decisions about data<br/>structure and moderation together.</p>
      <a href="https://forum.openplacereviews.org/" target="_blank">Join discussions</a>
      <div className="flex_conteiner">
        <div className="left_clmn">
          <h2>Register & Update places</h2>
          <p>Register new places, update information about them and link to other web sources about these places</p>
          <h2>Define Tagging & Metadata</h2>
          <p>Vote and make decisions about tagging principles of places and reviews</p>
        </div>
        <div className="right_clmn">
          <h2>Sync with Public Sources</h2>
          <p>Connect places to public source of information including OpenStreetMap, Wikipedia, blogs, websites and
            let crowlers keep information up to date</p>
          <h2>Detect fraud, spam and vandalism</h2>
          <p>Develop and decide on tools to detect non-desirable reviews</p>
        </div>
      </div>
      <ul>
        <li><a href="#">Early Signup Registration (Alpha)</a></li>
      </ul>
    </div>
    <div className="fourth-screen">
      <div className="border_screen4">&nbsp;</div>
      <div className="decentralization">
        <h1>Decentralization</h1>
        <div className="flex_conteiner">
          <div>Develop a decentralized system from the day 1 to avoid scalability issues in the future.</div>
          <div>
            <a href="#">Blockchain and data explorer</a><br/>
            <a href="https://forum.openplacereviews.org/t/blockchain-opendb-kickoff/64">Project kickoff article
              (forum)</a><br/>
            <a href="https://github.com/OpenPlaceReviews/">GitHub repo</a>
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
            <p><a href="#">Blockchain explorer</a></p>
          </div>
          <div>
            <p>With appropriate data tagging let applications and users decide how to display the data to avoid
              monopoly on decisions</p>
          </div>
        </div>
      </div>
    </div>
    <div className="sixth-screen">
      <div className="monetization">
        <img src={monetizationImg} alt="Monetization"/>
        <div>
          <h1>Future Monetization</h1>
          <p>Make business subscriptions once the project is matured and spread the income between applications,
            authors, moderators and network operators.</p>
        </div>
      </div>
    </div>
    <div className="seventh-screen">
      <div className="founders">
        <h1>Founders</h1>
        <div className="flex_conteiner">
          <div className="founder_block">
            <img src={victorShcherbPhoto} alt="Victor Shcherb" />
            <div>
              <div className="fuunder_name">Victor Shcherb</div>
              <div>CEO & Founder OsmAnd</div>
              <div><a href="https://osmand.net/">OsmAnd.net</a></div>
            </div>
          </div>

          <div className="founder_block">
            <img src={evgeneLisovskyPhoto} alt="Evgene Lisovsky" />
            <div>
              <div className="fuunder_name">Eugene Lisovsky</div>
              <div>CEO Maps.me</div>
              <div><a href="https://maps.me/">Maps.me</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Mission />
    <Footer />

  </div>;
};
