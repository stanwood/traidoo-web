import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryConfigProvider } from "react-query";
import App from "./App";
import Config from "./config";
import { GlobalErrorFallback } from "./core/errorBoundary";
import ReactQueryConfig from "./core/reactQueryConfig";
import "./i18n";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";

Sentry.init({
  // TODO: disable for local environment
  dsn: Config.sentryDSN,
  debug: Config.debug,
  environment: `${Config.environment}-${Config.clientId}`,
  integrations: [new Integrations.BrowserTracing()],
});

const GlobalCss = withStyles({
  "@global": {
    "html, body": {
      height: "100%",
    },
    "#root": {
      height: "100%",
    },
  },
})(() => null);

ReactDOM.render(
  <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
    <ThemeProvider theme={theme}>
      <GlobalCss />
      <CssBaseline />
      <ReactQueryConfigProvider config={ReactQueryConfig}>
        <App />
      </ReactQueryConfigProvider>
    </ThemeProvider>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
