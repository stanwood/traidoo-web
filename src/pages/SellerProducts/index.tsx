import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import {
  BooleanParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import { getProductsRequest } from "../../api/queries/products";
import deleteProductRequest from "../../api/queries/products/deleteProduct";
import Page from "../../components/Common/Page";
import ProductsList from "../../components/Products/components/Table/Table.component";
import { TableColumnsWithSorting } from "../../components/Products/interfaces";
import { CartContext } from "../../contexts/CartContext/context";
import { Order } from "../../core/types/queries";
import useStyles from "./styles";

const SellerProductsListPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { refetch: refetchCart } = useContext(CartContext);
  const pageTitle = t("products");

  const [query, setQuery] = useQueryParams({
    limit: NumberParam,
    offset: NumberParam,
    isAvailable: withDefault(BooleanParam, undefined),
    category: NumberParam,
    search: StringParam,
    page: withDefault(NumberParam, 0),
    order: StringParam,
    orderBy: StringParam,
    seller: NumberParam,
  });

  const { data, status, refetch } = useQuery(
    ["/products", { ...Object(query), my: true }],
    getProductsRequest
  );

  const [mutate] = useMutation(deleteProductRequest, {
    onSuccess: () => {
      refetch();
      refetchCart();
    },
  });

  const deleteProduct = (productId: number) => {
    mutate(productId);
  };

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TableColumnsWithSorting>(
    "createdAt"
  );

  const onSortChange = (
    event: React.MouseEvent<unknown>,
    property: keyof TableColumnsWithSorting
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setQuery({ order: isAsc ? "desc" : "asc", orderBy: property });
  };

  const onPageChange = (event: any, page: number) => {
    setQuery({ page });
  };

  const calculatePage = (page: number) => {
    return page ? +page : 0;
  };

  return (
    <Page title={pageTitle}>
      {!data || status === "loading" ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <>
          <ProductsList
            products={data}
            page={calculatePage(query.page)}
            onPageChange={onPageChange}
            onSortChange={onSortChange}
            order={order}
            orderBy={orderBy}
            sellerView={true}
            deleteProduct={deleteProduct}
          />

          <Fab
            aria-label="Add a new product"
            className={classes.fab}
            color="primary"
            onClick={() => history.push("/seller/products/add")}
          >
            <AddIcon />
          </Fab>
        </>
      )}
    </Page>
  );
};

export default SellerProductsListPage;
