import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { NumberParam, useQueryParams, withDefault } from "use-query-params";
import { getRoutesRequest } from "../../../api/queries/routes";
import Page from "../../../components/Common/Page";
import RoutesList from "../../../components/Routes/List";
import useRouteListStyles from "./styles";

const RoutesListPage: React.FC = () => {
  const classes = useRouteListStyles();
  const history = useHistory();

  const { t } = useTranslation();
  const pageTitle = t("routesList");

  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
  });

  const { status, data } = useQuery(
    ["routes", Object(query)],
    getRoutesRequest
  );

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

  if (status === "loading" || !data) {
    return (
      <Page title={pageTitle}>
        {Array.from(Array(10).keys()).map((number) => (
          <Skeleton key={number} />
        ))}
      </Page>
    );
  }

  return (
    <Page title={pageTitle}>
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
    </Page>
  );
};

export default RoutesListPage;
