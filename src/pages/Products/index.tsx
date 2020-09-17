import Skeleton from "@material-ui/lab/Skeleton";
import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import {
  BooleanParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import { getProductsRequest } from "../../api/queries/products";
import Page from "../../components/Common/Page";
import Overlay from "../../components/Overlay";
import ProductsList from "../../components/Products";
import { TableColumnsWithSorting } from "../../components/Products/interfaces";
import { Order } from "../../components/Products/types";
import { UserContext } from "../../contexts/UserContext/context";

const Products: React.FC = () => {
  const { user } = useContext(UserContext);

  const { t } = useTranslation();
  const pageTitle = t("products");

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

  const { status, data } = useQuery(
    [`products-${user.id}-${user.groups.join("-")}`, Object(query)],
    getProductsRequest,
    {
      refetchInterval: 1000 * 60,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
    }
  );

  const [filterBy, setFilterBy] = useState<string>("");
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TableColumnsWithSorting>(
    "createdAt"
  );

  const onSortChange = useCallback(
    (
      event: React.MouseEvent<unknown>,
      property: keyof TableColumnsWithSorting
    ) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
      setQuery({ order: isAsc ? "desc" : "asc", orderBy: property });
    },
    [order, orderBy, setQuery]
  );

  const onPageChange = useCallback(
    (event: any, page: number) => {
      setQuery({ page });
    },
    [setQuery]
  );

  const onFilterChange = useCallback(
    (filterItem: string) => {
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
    },
    [filterBy, setQuery]
  );

  const calculatePage = (page: number) => {
    return page ? +page : 0;
  };

  if (status === "loading" || !data) {
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
      <Overlay />
      <ProductsList
        products={data}
        page={calculatePage(query.page)}
        onPageChange={onPageChange}
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
        order={order}
        orderBy={orderBy}
        filterBy={filterBy}
      />
    </Page>
  );
};

export default Products;
