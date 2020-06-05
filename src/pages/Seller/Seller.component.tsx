import Skeleton from "@material-ui/lab/Skeleton";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  BooleanParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import {
  getCartRequest,
  modifyCartRequest,
  removeFromCartRequest,
} from "../../api/queries/cart";
import { getProductsRequest } from "../../api/queries/products";
import { getSellerByIdRequest } from "../../api/queries/users/user";
import { TableColumnsWithSorting } from "../../components/Products/interfaces";
import { Order } from "../../components/Products/types";
import SellerComponent from "../../components/Seller";
import { Context } from "../../core/context";

const Seller: React.FC = () => {
  const context = useContext(Context);
  const { id } = useParams();
  const { t } = useTranslation();

  const [query, setQuery] = useQueryParams({
    limit: NumberParam,
    offset: NumberParam,
    isAvailable: BooleanParam,
    category: NumberParam,
    search: StringParam,
    page: withDefault(NumberParam, 0),
    organic: BooleanParam,
    order: StringParam,
    orderBy: StringParam,
    seller: NumberParam,
  });

  const {
    status: productsStatus,
    data: productsData,
    error: productsError,
  } = useQuery(
    ["products", { ...Object(query), seller: Number(id) }],
    getProductsRequest
  );
  const [cartAdd] = useMutation(modifyCartRequest);
  const [cartDelete] = useMutation(removeFromCartRequest);
  const { refetch: refetchCart } = useQuery("/cart", getCartRequest, {
    onSuccess: (data: any) => {
      context.dispatch({ type: "cart", payload: data });
    },
  });

  const {
    status: sellerStatus,
    data: sellerData,
    error: sellerError,
  } = useQuery(["seller", Number(id)], getSellerByIdRequest);

  // TODO: the entire logic is almost the same as logic from the products list page
  // we should create some reusable component in the future

  const [filterBy, setFilterBy] = useState<string>("");
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

  const onFilterChange = (filterItem: string) => {
    if (filterItem === filterBy) {
      return;
    }

    if (filterItem === "organic") {
      setFilterBy("organic");
      setQuery({ organic: true });
    } else {
      setFilterBy("");
      setQuery({ organic: undefined });
    }
  };

  const calculatePage = (page: number) => {
    return page ? +page : 0;
  };

  const addToCart = async (
    productId: number,
    price: number,
    unit: string,
    name: string,
    amount: number
  ) => {
    await cartAdd({ productId, quantity: amount });
    refetchCart();
  };

  const removeFromCart = async (productId: number) => {
    await cartDelete({ productId });
    refetchCart();
  };

  return (
    <>
      <Helmet>
        <title>{t("sellerDetails")}</title>
      </Helmet>

      {!productsData || productsStatus === "loading" ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <SellerComponent
          products={productsData}
          productsError={productsError}
          seller={sellerData}
          sellerPending={sellerStatus === "loading"}
          sellerError={sellerError}
          page={calculatePage(query!.page)}
          onPageChange={onPageChange}
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
          order={order}
          orderBy={orderBy}
          filterBy={filterBy}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      )}
    </>
  );
};

export default Seller;
