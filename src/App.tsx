import { SnackbarProvider } from "notistack";
import React from "react";
import TagManager from "react-gtm-module";
import { Route, Switch } from "react-router-dom";
import {
  ExtendedStringifyOptions,
  QueryParamProvider,
  transformSearchStringJsonSafe,
} from "use-query-params";
import Config from "./config";
import CartProvider from "./contexts/CartContext";
import CategoriesProvider from "./contexts/CategoryContext";
import DrawerProvider from "./contexts/DrawerContext";
import UserProvider from "./contexts/UserContext";
import PrivateRoute from "./core/routes/PrivateRoute";
import usePageTracking from "./core/usePageTracking";
import { privateRoutes, publicRoutes } from "./routes";

const queryStringifyOptions: ExtendedStringifyOptions = {
  transformSearchString: transformSearchStringJsonSafe,
};

const tagManagerArgs = {
  gtmId: Config.gtmID,
};

TagManager.initialize(tagManagerArgs);

const App: React.FC = () => {
  usePageTracking();

  return (
    <QueryParamProvider
      ReactRouterRoute={Route}
      stringifyOptions={queryStringifyOptions}
    >
      <UserProvider>
        <SnackbarProvider>
          <CartProvider>
            <DrawerProvider>
              <CategoriesProvider>
                <Switch>
                  {publicRoutes.map((route) => (
                    <Route
                      key={route.key}
                      path={route.path}
                      exact={route.exact}
                    >
                      <route.layout activeTab={route.activeTab}>
                        <route.component />
                      </route.layout>
                    </Route>
                  ))}
                  {privateRoutes.map((route) => (
                    <PrivateRoute
                      key={route.key}
                      path={route.path}
                      exact={route.exact}
                    >
                      <route.layout activeTab={route.activeTab}>
                        <route.component />
                      </route.layout>
                    </PrivateRoute>
                  ))}
                </Switch>
              </CategoriesProvider>
            </DrawerProvider>
          </CartProvider>
        </SnackbarProvider>
      </UserProvider>
    </QueryParamProvider>
  );
};

export default App;
