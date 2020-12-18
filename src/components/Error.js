import React from 'react';

export default function Error() {
  return <main className="inner" id="opr-app">
    <div className="inner_container">
      <div className="containter_flex page-error">
        <div className="img-page-error"></div>
        <div className="txt-page-error">
          <h1>Something went wrong</h1>
          <p className="error-description">Internal service error</p>
          <p>Please contact us or try again later</p>
          <ul>
            <li><a href="mailto:hello@openplacereviews.org">hello@openplacereviews.org</a></li>
            <li><a href="https://forum.openplacereviews.org/">Forum</a></li>
            <li><a href="https://t.me/openplacereviews">Telegram channel</a></li>
          </ul>
        </div>
      </div>
    </div>
  </main>;
};
