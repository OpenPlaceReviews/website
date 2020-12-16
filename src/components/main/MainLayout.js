import React from "react";
import Footer from "./blocks/Footer";
import Header from "../blocks/Header";
import MainRouter from "./MainRouter";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyle = makeStyles({
  column: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  }
});

export default function MainLayout() {
  const classes = useStyle();

  return <div className={classes.column}>
    <Header />
    <Container className={classes.column}>
      <MainRouter/>
    </Container>
    <Footer />
  </div>;
};
