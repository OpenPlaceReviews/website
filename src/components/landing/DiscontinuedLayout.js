import React from "react";
import Footer from "./Footer";
import Header from "../blocks/Header";
import DiscontinuedPage from "./DiscontinuedPage";

export default function DiscontinuedLayout() {
  return <div className="landing-container" id="opr-app">
    <Header/>
    <DiscontinuedPage />
    <Footer/>
  </div>;
};
