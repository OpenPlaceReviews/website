import React from "react";

export default () => {
  return <div>
    <h1>Email not confirmed</h1>
    <p>Email validation link is out of date. Click “Resend” to get new email with validation link.</p>
    <button className="primaryAction" type="submit">Resend</button>
  </div>;
};
