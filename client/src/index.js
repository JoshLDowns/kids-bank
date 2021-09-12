import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AccountsWrapper } from "./context/accounts";
import { ThemeWrapper } from "./context/theme";
import { AuthWrapper } from "./context/auth";

ReactDOM.render(
  <React.StrictMode>
    <AuthWrapper>
      <ThemeWrapper>
        <AccountsWrapper>
          <App />
        </AccountsWrapper>
      </ThemeWrapper>
    </AuthWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
