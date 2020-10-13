import React from "react";

export default () => {
  return <main className="inner" id="opr-app">
    <div className="inner_container">
      <div className="containter_flex page-error">
        <div className="img-page-error"></div>
        <div className="txt-page-error">
          <h1>We can't find the page you are looking for.</h1>
          <p className="error-description">Error code: 404</p>
          <p>You can try one of this pages:</p>
          <ul>
            <li><a href="#">Database</a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Account</a></li>
          </ul>
        </div>
      </div>
    </div>
  </main>
};
