import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// import privy for authentication
import { PrivyProvider } from "@privy-io/react-auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PrivyProvider
    appId="cm4ppk4nz00i1hjjh3bbo5wqb"
    config={{
      appearance: {
        theme: "dark",
      },
    }}
  >
    <App />
  </PrivyProvider>,
);
