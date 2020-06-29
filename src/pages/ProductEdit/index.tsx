import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { getCategoriesRequest } from "../../api/queries/categories";
import { getContainersRequest } from "../../api/queries/containers";
import { getProductRequest } from "../../api/queries/products";
import { editProductRequest } from "../../api/queries/products/editProduct";
import { getRegionsRequest } from "../../api/queries/regions";
import { getTagsRequest } from "../../api/queries/tags";
import ProductForm from "../../shared/components/products/ProductForm";
import { ProductFormData } from "../../shared/components/products/ProductForm/types";
import { convertFormDataToProduct } from "../../shared/components/products/ProductForm/utils";

const ProductEditPage = () => {
  const { t } = useTranslation();
  const { id: productId } = useParams<{ id: string }>();
  const history = useHistory();

  const [editProduct] = useMutation(editProductRequest);

  const { data: product } = useQuery(
    ["/product", Number(productId)],
    getProductRequest
  );

  const { data: categories } = useQuery(
    ["/categories", false],
    getCategoriesRequest
  );
  const { data: containers } = useQuery(
    "/container_types",
    getContainersRequest
  );
  const { data: regions } = useQuery("/regions", getRegionsRequest);
  const { data: tags } = useQuery("/tags", getTagsRequest);

  const onSubmit = useCallback(
    (formData: ProductFormData) => {
      editProduct({
        productId: Number(productId),
        data: convertFormDataToProduct(formData),
      }).then(() => {
        history.push(`/seller/products/${productId}`);
      });
    },
    [editProduct, history, productId]
  );

  if (!product || !categories || !containers || !regions || !tags) {
    return (
      <>
        <Helmet>
          <title>{t("editProduct")}</title>
        </Helmet>
        {Array.from(Array(10).keys()).map((number) => (
          <Skeleton key={number} />
        ))}
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("editProduct")}</title>
      </Helmet>

      <Container maxWidth="md">
        <ProductForm
          onSubmit={onSubmit}
          categories={categories}
          containers={containers}
          regions={regions?.results}
          tags={tags}
          product={product}
          buttonName={t("save")}
        />
      </Container>
    </>
  );
};

export default ProductEditPage;
