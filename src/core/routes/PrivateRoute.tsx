import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { getAccessToken } from "../../api/jwt";

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { children, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={({ location }) =>
        getAccessToken() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
