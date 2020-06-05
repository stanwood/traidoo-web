import Skeleton from "@material-ui/lab/Skeleton";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getOrderRequest } from "../../api/queries/orders";
import getDocumentFileRequest from "../../api/queries/orders/getDocumentFile";
import Order from "../../components/Order";

const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const { data: order, status: orderStatus } = useQuery(
    ["order", Number(id)],
    getOrderRequest
  );

  const downloadFile = useCallback(() => {
    getDocumentFileRequest(order.id).then((data: any) => {
      const link = document.createElement("a");
      link.href = data.url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }, [order]);

  return (
    <>
      <Helmet>
        <title>{t("orderDetails")}</title>
      </Helmet>

      {orderStatus === "loading" || !order ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <Order order={order} onFileDownload={downloadFile} />
      )}
    </>
  );
};

export default OrderPage;
