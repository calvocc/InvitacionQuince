import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { AuthProvider } from "./context/auth-context";
import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ParallaxProvider>
          <App />
        </ParallaxProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
