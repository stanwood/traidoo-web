import { SnackbarProvider } from "notistack";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import {
  ExtendedStringifyOptions,
  QueryParamProvider,
  transformSearchStringJsonSafe,
} from "use-query-params";
import CartProvider from "./contexts/CartContext";
import CategoriesProvider from "./contexts/CategoryContext";
import DrawerProvider from "./contexts/DrawerContext";
import UserProvider from "./contexts/UserContext";
import history from "./core/history";
import PrivateRoute from "./core/routes/PrivateRoute";
import { privateRoutes, publicRoutes } from "./routes";

const queryStringifyOptions: ExtendedStringifyOptions = {
  transformSearchString: transformSearchStringJsonSafe,
};

const App: React.FC = () => {
  return (
    <Router history={history}>
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
    </Router>
  );
};

export default App;
