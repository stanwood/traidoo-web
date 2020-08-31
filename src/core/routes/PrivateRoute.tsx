import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext/context";

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { user, isIdle, isLoading } = useContext(UserContext);
  const { children, ...restProps } = props;

  if (isIdle || isLoading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Route
      {...restProps}
      render={({ location }) =>
        user.id ? (
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
