import React from 'react';

import Header from "../Header";
import Footer from "../Footer";

export default () => {
  return <div>
    <Header/>

    <div className="auth-container" id="opr-app">
      <h1>Your profile</h1>

      <p>User profile here</p>
    </div>

    <Footer/>
  </div>;
};
