import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useCallback } from "react";
import { queryCache, useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { NumberParam, useQueryParams, withDefault } from "use-query-params";
import { deleteRoute, getRoutes } from "../../../api/queries/routes";
import RoutesList from "../../../components/Routes/List";
import RoutesMap from "../Map";
import useRouteListStyles from "./styles";

const RoutesListPage = () => {
  const classes = useRouteListStyles();
  const history = useHistory();
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
  });

  const { status, data } = useQuery(["routes", Object(query)], getRoutes);
  const [routeDelete] = useMutation(deleteRoute, {
    onSuccess: () => queryCache.refetchQueries(["routes", Object(query)]),
  });

  const onPageChange = (page: number) => {
    setQuery({ page });
  };

  const addRouteButton = useCallback(
    () => history.push("/seller/logistic/routes/add"),
    []
  );

  if (status === "loading" || !data) {
    return (
      <>
        {Array.from(Array(10).keys()).map((number) => (
          <Skeleton key={number} />
        ))}
      </>
    );
  }

  return (
    <>
      <RoutesList
        routes={data.results}
        count={data.count}
        page={query.page}
        onPageChange={onPageChange}
        onRouteDelete={routeDelete}
      />
      <RoutesMap routes={data.results} />
      <Fab
        aria-label="Add a new product"
        className={classes.fab}
        color="primary"
        onClick={addRouteButton}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default RoutesListPage;
