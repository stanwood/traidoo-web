import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import { format } from "date-fns";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductRequest } from "../../api/queries/products";
import {
  addProductItemsRequest,
  deleteProductItemsRequest,
  getProductItemsRequest,
} from "../../api/queries/products/items";
import ProductDetail from "../../components/Product";
import ProductItems from "../../components/ProductItems";
import { ProductItemFormData } from "./types";
import validationSchema from "./validation";

const SellerProductDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const {
    status: productStatus,
    data: product,
    error: productError,
  } = useQuery(["/product", Number(id)], getProductRequest);

  const {
    status: productItemsStatus,
    data: productItems,
    refetch: refetchProductItems,
  } = useQuery(["/items", Number(id)], getProductItemsRequest);

  const [addItem] = useMutation(addProductItemsRequest);
  const [deleteItem] = useMutation(deleteProductItemsRequest, {
    onSuccess: () => {
      refetchProductItems();
    },
  });

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await error.response.json();

    if (errorResponse?.nonFieldErrors[0].code === "unique") {
      setError(
        "latestDeliveryDate",
        "incorrectData",
        t("productItemExistError")
      );
    }
  };

  const onSubmit = (formData: ProductItemFormData) => {
    // @ts-ignore
    formData.latestDeliveryDate = format(
      // @ts-ignore
      formData.latestDeliveryDate,
      "yyyy-MM-dd"
    );

    addItem(
      // @ts-ignore
      { productId: Number(id), ...formData },
      {
        onSuccess: () => {
          refetchProductItems();
          setOpenDialog(false);
        },
        onError: (err: any) => handleError(err),
      }
    );
  };

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    clearError,
    setError,
  } = useForm<ProductItemFormData>({
    validationSchema,
  });

  return (
    <>
      <Helmet>
        <title>{t("productDetail")}</title>
      </Helmet>

      {!product ||
      !productItems ||
      productStatus === "loading" ||
      productItemsStatus === "loading" ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <ProductDetail
              product={product}
              error={productError}
              showEditButton={true}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <ProductItems
              items={productItems}
              onDelete={deleteItem}
              register={register}
              errors={errors}
              setValue={setValue}
              clearError={clearError}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              openDialog={openDialog}
              handleDialogOpen={handleDialogOpen}
              handleDialogClose={handleDialogClose}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SellerProductDetailsPage;
