import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { getCategoriesRequest } from "../../api/queries/categories";
import { getContainersRequest } from "../../api/queries/containers";
import { getProductRequest } from "../../api/queries/products";
import { editProductRequest } from "../../api/queries/products/editProduct";
import { getRegionsRequest } from "../../api/queries/regions";
import { getGlobalSettingsRequest } from "../../api/queries/settings/global";
import { getSettingsRequest } from "../../api/queries/settings/settings";
import { getTagsRequest } from "../../api/queries/tags";
import Page from "../../components/Common/Page";
import ProductForm from "../../shared/components/products/ProductForm";
import { ProductFormData } from "../../shared/components/products/ProductForm/types";
import { convertFormDataToProduct } from "../../shared/components/products/ProductForm/utils";

const ProductEditPage: React.FC = () => {
  const { t } = useTranslation();
  const pageTitle = t("editProduct");

  const { id: productId } = useParams<{ id: string }>();
  const history = useHistory();

  const [editProduct] = useMutation(editProductRequest);

  const { data: product } = useQuery(
    ["/product", Number(productId)],
    getProductRequest
  );

  const { data: settings } = useQuery(["/settings", false], getSettingsRequest);
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
  const { data: globalSettings } = useQuery(
    "/global_settings",
    getGlobalSettingsRequest
  );

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

  if (
    !product ||
    !categories ||
    !containers ||
    !regions ||
    !tags ||
    !settings
  ) {
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
      <Container maxWidth="md">
        <ProductForm
          onSubmit={onSubmit}
          containers={containers}
          regions={regions?.results}
          tags={tags}
          globalSettings={globalSettings}
          settings={settings}
          product={product}
          buttonName={t("save")}
        />
      </Container>
    </Page>
  );
};

export default ProductEditPage;
