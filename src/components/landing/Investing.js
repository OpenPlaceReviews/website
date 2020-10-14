import React from "react";

import InvestingTabs from "./InvestingTabs";

import victorShcherbPhoto from "../../assets/images/victor_shcherb.png";
import evgeneLisovskyPhoto from "../../assets/images/evgene_lisovsky.png";

export default () => {
  return <div className="for_investors">

    <div className="first-screen">
      <div className="first-screen-bg">
        <div></div>
        <div className="header-body">
          <div className="first-screen-container">
            <div className="container_flex">
              <h1>
                Read, share and manage reviews about local places
              </h1>
            </div>
          </div>

        </div>
        <div className="right-line"></div>
        <div className="bottom-line"></div>
        <div className="bottom-center"></div>
        <div className="bottom-line"></div>
        <div className="bottom-right"></div>

      </div>

    </div>

    <div className="second-screen">
      <h1>User needs</h1>
      <div className="container_flex">
        <div className="user_need_item">
          As a <b>map user</b>, I would like to read, share and write reviews in
          my favorite app (<i>Maps.me, OsmAnd</i>), unfortunately I need to use
          multiple sytems like <i>TripAdvisor, Yelp</i> which don’t provide good
          map information
          <div className="user_need_border"></div>
          <div><b>OpenStreetMap users</b> • 500M</div>
          <div className="gray_text"><i>Open Reviews</i></div>
        </div>
        <div className="user_need_item">
          As an <b>active mapper</b>, I would like to provide more details about
          place and its facilities like attach place photo, detailed
          list of service and I can’t do it today in OSM
          <div className="user_need_border"></div>
          <div><b>OpenStreetMap community</b> • 5M</div>
          <div className="gray_text"><i>Place catalog</i></div>
        </div>
        <div className="user_need_item">
          As an <b>advanced user</b> or as a custom app <b>developer</b>, I would like
          to have ways to build custom filters via API or apps and that
          I can share information about places with particular service
          and reviews about that service
          <div className="user_need_border"></div>
          <div><b>Advanced users, Developers</b> • 5M, 1K</div>
          <div className="gray_text"><i>Extensibility and API</i></div>
        </div>
        <div className="user_need_item">
          As an <b>owner of local busines</b> I would like to reach the largest
          audience where it is relevant to it and offer special deals i.e.
          when user is looking for a place by browsing map and reviews
          <div className="user_need_border"></div>
          <div><b>Local businesses</b> • 20M</div>
          <div className="gray_text"><i>Local ads platform</i></div>
        </div>
      </div>
    </div>

    <div className="border_screen"></div>
    <div className="third-screen">
      <h1>Open World is waiting for Open Reviews Platform!</h1>
      <p className="screen_description">
        We believe that information provided by users should not be
        collected in any hidden way with a privacy respect and should be
        available for everyone for any possible usage.
      </p>
      <div className="screen_3_maps"></div>
    </div>
    <div className="border_screen"></div>
    <div className="fourth-screen">
      <h1>Market numbers</h1>
      <p>Market numbers and comparision between platforms & commercial companies.</p>
      <div>
        <div className="thead">
          <div>Product, Platform
          </div>
          <div>Reviews / Year
          </div>
          <div>Places
          </div>
          <div>Audience</div>
        </div>
        <div className="trow">
          <div>Google Maps
          </div>
          <div>100M
          </div>
          <div>100M
          </div>
          <div>1000M</div>
        </div>
        <div className="trow">
          <div>Facebook
          </div>
          <div>30M
          </div>
          <div>10M
          </div>
          <div>2000M</div>
        </div>
        <div className="trow">
          <div>TripAdvisor
          </div>
          <div>50M
          </div>
          <div>10M
          </div>
          <div>500M</div>
        </div>
        <div className="yelp trow">
          <div>Yelp
          </div>
          <div>25M
          </div>
          <div>5M
          </div>
          <div>5000M</div>
        </div>
        <div className="trow">
          <div>OpenStreetMap apps
          </div>
          <div>--
          </div>
          <div><span className="down_arr down_arr_2">20M</span>
          </div>
          <div><span className="down_arr down_arr_3">500M</span></div>
        </div>
        <div className="opr_apps trow">
          <div>OpenPlaceReviews apps<br /><span className="gray_target">(target by 2020)</span>
          </div>
          <div><span className="up_arr">25M</span>
          </div>
          <div><span className="white_item">20M</span>
          </div>
          <div><span className="white_item">100M</span></div>
        </div>
      </div>
    </div>
    <div className="fifth-screen">
      <div className="container">
        <h1>Number of reviews over time</h1>
        <p>Comparision of Local Review Sites according to <br />
          <a href=">https://www.brightlocal.com/research/comparison-of-local-review-sites/">
            https://www.brightlocal.com/research/comparison-of-local-review-sites/
          </a>
        </p>
        <h2>July 2016 - July 2017</h2>
        <div className="container_flex flex-v-align-center">
          <div className="screen_5_graphic"></div>
          <div className="legend">
            <div className="google">Google</div>
            <div className="facebook">Facebook</div>
            <div className="yelp">Yelp</div>
            <div className="tripadvisor">TripAdvisor</div>
            <div className="foursquare">Foursquare</div>
          </div>
        </div>
        <div className="container_flex graphic_x">
          <div>07-16</div>
          <div>08-16</div>
          <div>09-16</div>
          <div>10-16</div>
          <div>11-16</div>
          <div>12-16</div>
          <div>01-17</div>
          <div>02-17</div>
          <div>03-17</div>
          <div>04-17</div>
          <div>05-17</div>
          <div>06-17</div>
          <div>07-17</div>
        </div>
      </div>
    </div>

    <div className="sixth-screen">
      <h1>Open World disrupts Google monopoly</h1>
      <p>
        Google is a leading platform for both maps and local reviews. As we can see
        there is no single close competitor to Google Maps, on the other hand
        applications based on OpenStreetMap in total is growing each year and
        could easily exceed Google Maps audience in 2-3 years. <br />
        If OpenPlaceReviews kicks off, it could reach the level to compete in 1-2 years.
      </p>
      <h2>Map apps / Audience</h2>
      <div className="screen_6_graphic_1"></div>
      <h2>Map apps — Reviews per year</h2>
      <div className="screen_6_graphic_2"></div>
    </div>
    <div className="border_screen"></div>
    <div className="seventh-screen">
      <div className="founders">
        <h1>Founders</h1>
        <div className="flex_conteiner">
          <div>
            <div className="founder_block">
              <img src={victorShcherbPhoto} alt="Victor Shcherb" />
                <div>
                  <div className="fuunder_name victor">Victor Shcherb</div>
                  <div className="position">2010-Present</div>
                  <div className="link">CEO & Founder <a href="https://osmand.net/">OsmAnd</a></div>
                </div>
            </div>
            <h2>Background</h2>
            <ul>
              <li>Technology Architect @ Pegasystems</li>
              <li>Lead Java Developer - 10 years</li>
            </ul>
            <h2>Responsibilities</h2>
            <ul>
              <li>Technical leadership</li>
              <li>Product design</li>
              <li>Product development</li>
            </ul>
            <div className="contact"><a href="#">LinkedIn</a></div>
          </div>

          <div>
            <div className="founder_block">
              <img src={evgeneLisovskyPhoto} alt="Evgene Lisovsky" />
                <div>
                  <div className="fuunder_name eugene">Eugene Lisovsky</div>
                  <div className="position">2016-Present</div>
                  <div className="link">CEO <a href="https://maps.me/">Maps.me</a></div>
                </div>
            </div>
            <h2>Background</h2>
            <ul>
              <li>CMO & Shareholder @ LITRES.ru</li>
              <li>Founder & CMO @ MoikaMoika</li>
              <li>Exit 2018</li>
            </ul>
            <h2>Responsibilities</h2>
            <ul>
              <li>Business Development</li>
              <li>Partner connections</li>
              <li>Product Econonomy</li>
            </ul>
            <div className="contact"><a href="#">LinkedIn</a></div>
          </div>
        </div>
      </div>
    </div>
    <div className="border_screen"></div>
    <div className="eighth-screen">
      <h1>Problems</h1>
      <p>Users, Local Business, Geo Applications</p>
      <div className="container_flex">
        <div className="item">
          <h2>Users</h2>
          <p className="gray_text">Looking for place reviews</p>
          <div className="border_item_2px"></div>
          <p><b>Lack of Trust:</b> Rating manipulations in Google,
            TripAdvisor & Yelp = lack of trust to services operated by.</p>
          <div className="border_item_1px"></div>
          <p><b>The need to switch between different apps:</b>
            TripAdvisor, Yelp, Foursquare: to make a decision.</p>
          <div className="border_item_1px"></div>
          <p><b>Hard to apply filters to reviews</b> as reviews tagging
            structure varies from one system to another.</p>
          <div className="border_item_1px"></div>
        </div>
        <div className="item">
          <h2>Local Business</h2>
          <p className="gray_text">Looking for feedback and new clients</p>
          <div className="border_item_2px"></div>
          <p><b>No resources and competency</b> in advertising & marketing to work with enterprise
            instruments (Google AdWords, Yelp, TripAdvisor).</p>
          <div className="border_item_1px"></div>
          <p><b>Too expensive</b> traditional offline advertising to cover the traffic
            in a radius more than 50 meters from the location.</p>
          <div className="border_item_1px"></div>
          <p><b>Hard to manage</b> all the data in all claimed accounts in
            different review platforms (Yelp, TripAdvisor, Google, other).</p>
          <div className="border_item_1px"></div>
        </div>
        <div className="item">
          <h2>Geo Applications</h2>
          <p className="gray_text">Looking for open database of reviews</p>
          <div className="border_item_2px"></div>
          <p><b>High prices</b> for proprietary reviews (Yelp, TripAdvisor, Foursquare):
            small and medium geo applications can not afford it.</p>
          <div className="border_item_1px"></div>
          <p><b>Hard to sell local ads</b> globally when your app is not #1 in the exact region.</p>
          <div className="border_item_1px"></div>
          <p><b>Small amount of own reviews</b> for small apps collecting reviews becomes a big problem. </p>
          <div className="border_item_1px"></div>
        </div>
      </div>
    </div>
    <div className="border_screen"></div>

    <InvestingTabs/>

    <div className="tenth-screen">
      <div className="container">
        <h1>How Open Communities Convert into Commercial Unicorns?</h1>
        <div className="community_commercial">
          <div className="row1_cell_1_3">
            <div className="container_flex">
              <div className="osm_icon"></div>
              <div>
                <h2>OpenStreetMap</h2>
                <div><b>5M community</b></div>
                <div>60K Monthly Active Mappers</div>
                <div>Build open maps around the world</div>
              </div>
            </div>
          </div>
          <div></div>
          <div className="row1_cell_5">
            <h2>Google Maps</h2>
            <div><b>2000 paid mappers </b></div>
            <div>2000 Monthly Active Mappers</div>
            <div>Build most detailed system</div>
          </div>

          <div className="row2_cell_1"></div>
          <div></div>
          <div className="row2_cell_3"></div>
          <div></div>
          <div className="row2_cell_5">
            <div></div>
            <div></div>
          </div>

          <div className="row3_cell_1">
            <div className="logo_mapbox"></div>
            <div className="b2b">B2B</div>
            <div><b>Google Maps API alternative</b></div>
            <div>Map Costs: $0</div>
            <div>Audience: 500M</div>
            <div>Revenue: ~$100M</div>
            <div>Team: 250</div>
          </div>
          <div></div>
          <div className="row3_cell_3">
            <div className="mapsme_logo"></div>
            <div className="b2c">B2C</div>
            <div><b>#1 Maps for Travelers</b></div>
            <div>Map Costs: $0</div>
            <div>Audience: 120M</div>
            <div>Revenue: ~$5M</div>
            <div>Team: 40</div>
          </div>
          <div></div>
          <div className="row3_cell_5">
            <div className="google_maps_logo"></div>
            <div className="container_flex flex_nowrap">
              <div className="b2c">B2C</div>
              <div className="b2b">B2B</div>
            </div>
            <div><b>Google Maps</b></div>
            <div>Map Costs: ~$2000M</div>
            <div>Audience: 1000M</div>
            <div>Team: 2000</div>
          </div>
        </div>
      </div>
    </div>
    <div className="eleventh-screen">
      <h1>Contact Us</h1>
      <div className="email_address"><a href="mailto:hello@openplacereviews.org">hello@openplacereviews.org</a></div>
      <div><a className="button" href="mailto:hello@openplacereviews.org">Send request</a></div>
    </div>

  </div>;
};
