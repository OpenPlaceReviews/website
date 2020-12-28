import React from "react";
import Footer from "./Footer";
import Header from "../blocks/Header";
import LandingRouter from "./LandingRouter";

export default function LandingLayout() {
  return <div className="landing-container" id="opr-app">
    <Header/>
    <LandingRouter/>
    <Footer/>
  </div>;
};
