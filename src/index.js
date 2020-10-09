import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";
import "./assets/scss/app.scss";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.querySelector("#root"));
