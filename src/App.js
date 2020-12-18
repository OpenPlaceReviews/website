import React from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";

import theme from "./theme";

import AuthProvider from "./providers/AuthProvider";
import {ThemeProvider} from "react-jss";
import Router from "./Router";

export default function App() {
  return <AuthProvider>
    <ThemeProvider theme={theme}>
      <Router/>
    </ThemeProvider>
  </AuthProvider>;
};
