import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { ReactQueryConfigProvider } from "react-query";
import App from "./App";
import "./i18n";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";

const queryConfig = {
  // Global
  suspense: false,
  refetchAllOnWindowFocus: false,

  // useQuery
  retry: 0,
  staleTime: 0,
  cacheTime: 1 * 60 * 1000, // 1min
  // refetchInterval: false,
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ReactQueryConfigProvider config={queryConfig}>
      <App />
    </ReactQueryConfigProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
