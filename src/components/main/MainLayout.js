import React from "react";
import Footer from "./blocks/Footer";
import Header from "../blocks/Header";
import MainRouter from "./MainRouter";

export default function MainLayout() {
  return <div className="main-container">
    <Header />
    <MainRouter/>
    <Footer />
  </div>;
};
