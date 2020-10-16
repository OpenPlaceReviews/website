import React from "react";
import {Route, Switch} from "react-router-dom";

import Lending from "./landing/Lending";
import Investing from "./landing/Investing";

import Footer from "./landing/Footer";
import Mission from "./landing/Mission";
import Header from "./Header";

export default () => {
  return <div className="landing-container" id="opr-app">
    <Header />

    <Switch>
      <Route exact path="/" component={Lending} />
      <Route path="/investing" component={Investing} />
    </Switch>

    <Mission />
    <Footer />
  </div>;
};
