import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductRequest } from "../../api/queries/products";
import {
  deleteProductItemsRequest,
  getProductItemsRequest,
} from "../../api/queries/products/items";
import Page from "../../components/Common/Page";
import ProductDetail from "../../components/Product";
import ProductItems from "../../components/ProductItems";
import AddProductItemsProvider from "../../contexts/AddProductItemsContext";
import useSellerProductDetailsPageStyles from "./styles";

const SellerProductDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const pageTitle = t("productDetail");
  const { id } = useParams<{ id: string }>();
  const classes = useSellerProductDetailsPageStyles();

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

  const [deleteItem] = useMutation(deleteProductItemsRequest, {
    onSuccess: () => {
      refetchProductItems();
    },
  });

  return (
    <Page title={pageTitle} padding={false}>
      {!product ||
      !productItems ||
      productStatus === "loading" ||
      productItemsStatus === "loading" ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12} lg={9}>
            <ProductDetail
              product={product}
              // eslint-disable-next-line
              // @ts-ignore
              error={productError}
              showEditButton={true}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <AddProductItemsProvider>
              <ProductItems
                productId={Number(id)}
                items={productItems}
                onDelete={deleteItem}
                refreshItems={refetchProductItems}
              />
            </AddProductItemsProvider>
          </Grid>
        </Grid>
      )}
    </Page>
  );
};

export default SellerProductDetailsPage;
