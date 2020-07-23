import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductRequest } from "../../api/queries/products";
import Page from "../../components/Common/Page";
import ProductDetails from "../../components/Product";

const Product: React.FC = () => {
  const { t } = useTranslation();
  const pageTitle = t("productDetail");

  const { id } = useParams<{ id: string }>();

  const { status, data, error } = useQuery(
    ["/product", Number(id)],
    getProductRequest,
    {
      refetchInterval: 1000 * 60,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
    }
  );

  return (
    <Page title={pageTitle} padding={false}>
      {!data || status === "loading" ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <ProductDetails product={data} error={error} />
      )}
    </Page>
  );
};

export default Product;
