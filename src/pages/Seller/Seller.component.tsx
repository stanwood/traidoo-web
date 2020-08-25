import Skeleton from "@material-ui/lab/Skeleton";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  BooleanParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import { getProductsRequest } from "../../api/queries/products";
import { getSellerByIdRequest } from "../../api/queries/users/user";
import Page from "../../components/Common/Page";
import { TableColumnsWithSorting } from "../../components/Products/interfaces";
import { Order } from "../../components/Products/types";
import SellerComponent from "../../components/Seller";

const Seller: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const pageTitle = t("sellerDetails");

  const [query, setQuery] = useQueryParams({
    limit: NumberParam,
    offset: NumberParam,
    isAvailable: withDefault(BooleanParam, true),
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

  return (
    <Page title={pageTitle} padding={false}>
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
        />
      )}
    </Page>
  );
};

export default Seller;
