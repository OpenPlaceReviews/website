import React from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";

import AuthProvider from "./providers/AuthProvider";
import Router from "./Router";

export default function App() {
  return <AuthProvider>
    <Router/>
  </AuthProvider>;
};
