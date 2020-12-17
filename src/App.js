import React from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";

import theme from "./theme";

import AuthProvider from "./providers/AuthProvider";
import {ThemeProvider} from "react-jss";
import Router from "./Router";
import ErrorBoundary from "./ErrorBoundary";

export default function App() {
  return <ErrorBoundary>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router/>
      </ThemeProvider>
    </AuthProvider>
  </ErrorBoundary>;
};
