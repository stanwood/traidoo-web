import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
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
import { addSchema } from "../../shared/components/products/ProductForm/validation";

const ProductAddPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
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
      validationSchema: addSchema,
    }
  );

  console.log("errors", errors);

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
    console.log("submit", formData);
    addProduct(formData).then((product: Product) =>
      history.push(`/seller/products/${product.id}`)
    );
  };

  return (
    <>
      <Helmet>
        <title>{t("addProduct")}</title>
      </Helmet>

      {containersStatus === "loading" ||
      regionsStatus === "loading" ||
      categoriesStatus === "loading" ||
      tagsStatus === "loading" ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
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
            buttonName={t("add")}
          />
        </Container>
      )}
    </>
  );
};

export default ProductAddPage;
