import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// import React Router DOM
import { BrowserRouter as Router } from "react-router-dom";

// const cors = require("cors");
// app.use(cors({ origin: "true", credentials: true }));

// import privy for authentication
import { PrivyProvider } from "@privy-io/react-auth";
import { AppProvider } from "./context";

const privyAppID = import.meta.env.VITE_PRIVY_API_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PrivyProvider
    appId={privyAppID}
    config={{
      appearance: {
        theme: "dark",
        // Display email and wallet as login methods
        loginMethods: ["email"],
      },
    }}
  >
    <Router>
      <AppProvider>
        <App />
      </AppProvider>
    </Router>
  </PrivyProvider>,
);
