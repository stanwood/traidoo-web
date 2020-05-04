import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { getCategoriesRequest } from "../../api/queries/categories";
import { getContainersRequest } from "../../api/queries/containers";
import { addProductRequest } from "../../api/queries/products/addProduct";
import { getRegionsRequest } from "../../api/queries/regions";
import { getTagsRequest } from "../../api/queries/tags";
import ProductAdd from "../../components/ProductAdd";
import validationSchema from "./validation";

const ProductAddPage = () => {
  const [addProduct] = useMutation(addProductRequest);
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
      validationSchema: validationSchema,
    }
  );

  useEffect(() => {
    register("categoryId");
    register("containerTypeId");
    register("tags");
    register("vat");
    register("unit");
    register("deliveryOptionsIds");
    register("regionIds");
  }, [register]);

  const onSubmit = (formData: any) => {
    addProduct(formData);
  };

  if (
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
      <ProductAdd
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
      />
    </Container>
  );
};

export default ProductAddPage;
