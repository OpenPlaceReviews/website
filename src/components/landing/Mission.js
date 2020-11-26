import React from "react";
import Expand from "../misc/Expand";

export default () => {
  return <div className="expand-block">
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
</div>;
}
