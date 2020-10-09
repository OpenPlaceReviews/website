import React from "react";
import Tabs from "../misc/Tabs";

export default () => {
  return <div className="ninth-screen">
    <h1>How it works</h1>

    <Tabs>
      <div data-label="Participants">
        <p>System participants is possible to divide into <b>3</b> main groups: <b>apps, community, sales partners</b>.
        </p>
        <ul>
          <li><b>Apps</b> represents groups of application that uses review data to display information about place.
            Each app has its own <b>audience</b>, people that <b>businesses</b> are interested in.
          </li>
          <li><b>Community</b> is a group of people that helps to maintain the data consistent, clean and
            accurate. Community usually divided into <b>local chapters</b> that combine people either by
            language or by territory or by other interests
          </li>
          <li><b>Sales & Businesses.</b> Sales partners and marketing companies connect <b>local businesses</b> to
            the platform in order to do marketing activities. Businesses are not supposed to connect
            individually in the begginning in order to keep API and reporting simple.
          </li>
        </ul>
        <div className="tab_1_diagramm"></div>
      </div>

      <div data-label="Data flow">
        <p>Each group operates with platform by providing and retrieving specific data.</p>
        <ul>
          <li><b>Apps</b> are responsible to collect and publish reviews from <b>audience</b> to the platform. Apps
            also
            create own ratings for places based on aggregated data for their users.
          </li>
          <li>
            <b>Community</b> operates with raw data using platform tools. It votes for the database schema and
            makes decision about moderation. Also it provides documentation.
          </li>
          <li>
            <b>Sales & Businesses.</b> Businesses provide accurate data about the business and also replies to
            original reviews in case it is needed. In the reverse direction they get analytics how <b>audience</b>
            (potential customers) deal with data.

          </li>
        </ul>
        <div className="tab_2_diagramm"></div>
      </div>

      <div data-label="Software">
        <p>As a platform OpenPlaceReviews should provide tools & programs, so system could operate flawlessly.</p>
        <ul>
          <li>
            <b>Apps</b> need 2 types of software. Main database or API that will be able to download, keep
            reviews up to date and will have API to contribute reviews back. Second API is needed to
            participate and sell local ads to its <b>audience</b> and provide analytics to <b>businesses</b>.
          </li>
          <li>
            <b>Community</b> needs various tools to keep system running. It includes monitoring, moderation,
            voting and documentation systems. It should be a proper end-user system (web or mobile).
          </li>
          <li>
            <b>Sales & Businesses.</b> Until self-managed platform is ready, partners will need only API to
            connect to their reporting systems. Also customer tracker system is needed to check what
            business is connected via what partner.
          </li>
        </ul>
        <div className="tab_3_diagramm"></div>
      </div>

      <div data-label="Money flow">
        <p>In order to sustain and grow system needs money circulation. OpenPlaceReviews is supposed to take only
          small % of the revenue.</p>
        <ul>
          <li>
            <b>Apps</b> is mostly money consumers in the system. They take money for local ads published to
            their <b>audience</b>. Initially apps could sponsor platform development to get access to reviews.
          </li>
          <li>
            <b>Community</b> will get rewards as platform grows for keeping it clean & reasonable.
          </li>
          <li>
            <b>Sales</b> operates as a proxy for local businesses who contributes. In case of self-managed
            platform individual sales will get incentvies % of business subscription regularly (each month).
          </li>
          <li>
            <b>Businesses</b> will have 2 products to buy. 1nd is a basic monthly subscription which will give
            opportunity to do a basic promotion and give some control of published reviews and reputation about it.
            2nd is ability to publish most effective local ads through all apps connected to OpenPlaceReviews.
          </li>
        </ul>
        <div className="tab_4_diagramm"></div>
      </div>

      <div data-label="Conversions">
        <p>Platform unites all participants and engages conversions between these groups.</p>
        <ul>
          <li>
            Most active audience of <b>Apps</b> is interested in the quality of the product they use, so part of it
            will definitely participate in product development and transforms into <b>Community</b>.
          </li>
          <li>
            Happy participants of <b>Community</b> (Ambassadors) will spread news about their participation
            and create a viral effect. Also some of the might be interested in incentives provided by
            platform and could become individual salesmen.
          </li>
          <li>
            <b>Apps audience</b> naturally represents <b><i>potential business customers</i></b>. That’s why Business
            is
            interested to participate and support the platform.
          </li>
        </ul>
        <div className="tab_5_diagramm"></div>
      </div>
    </Tabs>
  </div>;
};
