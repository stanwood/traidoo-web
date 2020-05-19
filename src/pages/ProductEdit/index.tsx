import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { editSchema } from "../../shared/components/products/ProductForm/validation";

const ProductEditPage = () => {
  const { t } = useTranslation();
  const { id: productId } = useParams<{ id: string }>();
  const history = useHistory();
  const { data: productData, status: productStatus } = useQuery(
    ["/product", Number(productId)],
    getProductRequest
  );

  const [editProduct] = useMutation(editProductRequest);
  const { data: categoriesData, status: categoriesStatus } = useQuery(
    ["/categories", false],
    getCategoriesRequest
  );
  const { data: containersData, status: containersStatus } = useQuery(
    "/container_types",
    getContainersRequest
  );
  const { data: regionsData, status: regionsStatus } = useQuery(
    "/regions",
    getRegionsRequest
  );
  const { data: tagsData, status: tagsStatus } = useQuery(
    "/tags",
    getTagsRequest
  );

  const { register, handleSubmit, errors, setValue, clearError } = useForm<any>(
    {
      validationSchema: editSchema,
    }
  );

  useEffect(() => {
    register("categoryId");
    register("containerTypeId");
    register("tags");
    register("vat");
    register("unit");
    register("deliveryOptionsIds");
    register("regions");
  }, [register]);

  const onSubmit = (formData: any) => {
    editProduct({ productId: Number(productId), data: formData }).then(() => {
      history.push(`/seller/products/${productId}`);
    });
  };

  if (
    productStatus === "loading" ||
    containersStatus === "loading" ||
    regionsStatus === "loading" ||
    categoriesStatus === "loading" ||
    tagsStatus === "loading"
  ) {
    return (
      <Container maxWidth="md">
        {Array.from(Array(10).keys()).map((number) => (
          <Skeleton key={number} />
        ))}
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <ProductForm
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        setValue={setValue}
        clearError={clearError}
        categories={categoriesData}
        containers={containersData}
        // @ts-ignore
        regions={regionsData.results}
        tags={tagsData}
        defaultValues={productData}
        buttonName={t("save")}
      />
    </Container>
  );
};

export default ProductEditPage;
