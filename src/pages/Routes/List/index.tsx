import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Skeleton from "@material-ui/lab/Skeleton";
import { useLoadScript } from "@react-google-maps/api";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { queryCache, useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { NumberParam, useQueryParams, withDefault } from "use-query-params";
import { deleteRoute, getRoutes } from "../../../api/queries/routes";
import RoutesList from "../../../components/Routes/List";
import Config from "../../../config";
import RoutesMap from "../Map";
import useRouteListStyles from "./styles";

const googleMapsLibraries = ["places"];

const RoutesListPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useRouteListStyles();
  const history = useHistory();
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: Config.googleMapsApiKey,
    preventGoogleFontsLoading: true,
    libraries: googleMapsLibraries,
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

  return (
    <>
      <Helmet>
        <title>{t("routesList")}</title>
      </Helmet>

      {status === "loading" || !data ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <>
          <RoutesList
            routes={data.results}
            count={data.count}
            page={query.page}
            onPageChange={onPageChange}
            onRouteDelete={routeDelete}
          />
          {data.results.length > 0 && isLoaded && (
            <RoutesMap routes={data.results} loadError={loadError} />
          )}
          <Fab
            aria-label="Add a new product"
            className={classes.fab}
            color="primary"
            onClick={addRouteButton}
          >
            <AddIcon />
          </Fab>
        </>
      )}
    </>
  );
};

export default RoutesListPage;
