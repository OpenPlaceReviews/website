import React from "react";

const EmailConfirmed = ({email}) => {
  return <div>
    <h1>Email confirmed</h1>
    <p>Your email {email} is successfully confirmed. Start using OpenPlaceReviews.org by clicking continue.</p>
    <button className="primaryAction" type="submit">Continue</button>
  </div>;
};

EmailConfirmed.propTypes = {
  email: PropTypes.string.isRequired
};

export default EmailConfirmed;
