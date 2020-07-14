import Skeleton from "@material-ui/lab/Skeleton";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { NumberParam, useQueryParams, withDefault } from "use-query-params";
import getDocumentFileRequest from "../../api/queries/documents/download";
import { getOrdersRequest } from "../../api/queries/orders";
import Page from "../../components/Common/Page";
import OrdersList from "../../components/Orders";
import { OrdersPageProps } from "./interfaces";

const OrdersPage: React.FC<OrdersPageProps> = (props: OrdersPageProps) => {
  const { type } = props;
  const displayBuyer = type === "sales";
  const { t } = useTranslation();
  const pageTitle = t("orders");

  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
  });

  const { data, status } = useQuery(
    [`orders/${type}`, type, { ...Object(query) }],
    getOrdersRequest,
    { cacheTime: 1 }
  );

  const onPageChange = useCallback(
    (page: number) => {
      setQuery({ page });
    },
    [setQuery]
  );

  const downloadFile = useCallback((documentId: number) => {
    getDocumentFileRequest(documentId).then((data) => {
      const link = document.createElement("a");
      link.href = data.url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }, []);

  if (status === "loading") {
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
      <OrdersList
        orders={data?.results}
        count={data?.count || 0}
        page={query.page}
        onPageChange={onPageChange}
        downloadFile={downloadFile}
        displayBuyer={displayBuyer}
      />
    </Page>
  );
};

export default OrdersPage;
