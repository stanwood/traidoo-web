import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { NumberParam, useQueryParams, withDefault } from "use-query-params";
import { getRoutes } from "../../../api/queries/routes";
import RoutesList from "../../../components/Routes/List";
import useRouteListStyles from "./styles";

const RoutesListPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useRouteListStyles();
  const history = useHistory();
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
  });

  const { status, data } = useQuery(["routes", Object(query)], getRoutes);

  const onPageChange = useCallback(
    (page: number) => {
      setQuery({ page });
    },
    [setQuery]
  );

  const addRouteButton = useCallback(
    () => history.push("/seller/logistic/routes/add"),
    [history]
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
          />
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
