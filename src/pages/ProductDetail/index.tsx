import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductRequest } from "../../api/queries/products";
import ProductDetail from "../../components/Product";

const Product: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { status, data, error } = useQuery(
    ["/product", Number(id)],
    getProductRequest
  );

  return (
    <>
      <Helmet>
        <title>{t("productDetail")}</title>
      </Helmet>

      {!data || status === "loading" ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <ProductDetail product={data} error={error} />
      )}
    </>
  );
};

export default Product;
