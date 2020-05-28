import Skeleton from "@material-ui/lab/Skeleton";
import React, { useCallback } from "react";
import { useQuery } from "react-query";
import { NumberParam, useQueryParams, withDefault } from "use-query-params";
import { getOrdersRequest } from "../../api/queries/orders";
import DeliveriesList from "../../components/Deliveries";

const DeliveriesPage: React.FC = () => {
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
    <DeliveriesList
      deliveries={data.results}
      count={data.count}
      page={query.page}
      onPageChange={onPageChange}
    />
  );
};

export default DeliveriesPage;
