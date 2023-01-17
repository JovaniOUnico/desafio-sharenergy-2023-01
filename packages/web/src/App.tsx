import { useState } from "react";
import React from "react";
import GlobalStyle from './styles/global'
import RouteApp from './routes'
import { AuthProvider } from "./context/Auth";

const App = () => {

  return (
    <div>
      <AuthProvider>
        <RouteApp></RouteApp>
        <GlobalStyle />
      </AuthProvider>
    </div>
  )

};

export default App;