import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// const cors = require("cors");
// app.use(cors({ origin: "true", credentials: true }));

// import privy for authentication
import { PrivyProvider } from "@privy-io/react-auth";
import { AppProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PrivyProvider
    appId="cm4ppk4nz00i1hjjh3bbo5wqb"
    config={{
      appearance: {
        theme: "dark",
        // Display email and wallet as login methods
        loginMethods: ["email"],
      },
    }}
  >
    <AppProvider>
      <App />
    </AppProvider>
  </PrivyProvider>,
);
