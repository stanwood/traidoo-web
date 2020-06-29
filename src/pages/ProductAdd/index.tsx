import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { getCategoriesRequest } from "../../api/queries/categories";
import { getContainersRequest } from "../../api/queries/containers";
import { addProductRequest } from "../../api/queries/products/addProduct";
import { getRegionsRequest } from "../../api/queries/regions";
import { getTagsRequest } from "../../api/queries/tags";
import Product from "../../core/types/product";
import ProductForm from "../../shared/components/products/ProductForm";
import { ProductFormData } from "../../shared/components/products/ProductForm/types";
import { convertFormDataToProduct } from "../../shared/components/products/ProductForm/utils";

const ProductAddPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [addProduct] = useMutation(addProductRequest);

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
      addProduct(convertFormDataToProduct(formData)).then((product: Product) =>
        history.push(`/seller/products/${product.id}`)
      );
    },
    [addProduct, history]
  );

  if (!categories || !containers || !regions || !tags) {
    return (
      <>
        <Helmet>
          <title>{t("addProduct")}</title>
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
        <title>{t("addProduct")}</title>
      </Helmet>

      <Container maxWidth="md">
        <ProductForm
          onSubmit={onSubmit}
          categories={categories}
          containers={containers}
          regions={regions?.results}
          tags={tags}
          buttonName={t("add")}
        />
      </Container>
    </>
  );
};

export default ProductAddPage;
