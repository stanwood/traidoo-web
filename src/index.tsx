import { CssBaseline, ThemeProvider } from "@material-ui/core";
import * as Sentry from "@sentry/browser";
import React from "react";
import ReactDOM from "react-dom";
import { ReactQueryConfigProvider } from "react-query";
import App from "./App";
import Config from "./config";
import ReactQueryConfig from "./core/reactQueryConfig";
import "./i18n";
import "./index.css";
import theme from "./theme";

Sentry.init({
  // TODO: disable for local environment
  dsn: Config.sentryDSN,
  debug: Config.debug,
  environment: `${Config.environment}-${Config.clientId}`,
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ReactQueryConfigProvider config={ReactQueryConfig}>
      <App />
    </ReactQueryConfigProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
