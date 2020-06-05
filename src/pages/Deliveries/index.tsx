import Skeleton from "@material-ui/lab/Skeleton";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { NumberParam, useQueryParams, withDefault } from "use-query-params";
import { getOrdersRequest } from "../../api/queries/orders";
import DeliveriesList from "../../components/Deliveries";

const DeliveriesPage: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
  });

  const { data, status } = useQuery(
    ["orders", { ...Object(query), status: 1 }],
    getOrdersRequest
  );

  const onPageChange = useCallback(
    (page: number) => {
      setQuery({ page });
    },
    [query]
  );

  return (
    <>
      <Helmet>
        <title>{t("deliveries")}</title>
      </Helmet>

      {status === "loading" || !data ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <DeliveriesList
          deliveries={data.results}
          count={data.count}
          page={query.page}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default DeliveriesPage;
