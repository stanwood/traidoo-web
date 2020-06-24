import Skeleton from "@material-ui/lab/Skeleton";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
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
import Overlay from "../../components/Overlay";
import ProductsList from "../../components/Products";
import { TableColumnsWithSorting } from "../../components/Products/interfaces";
import { Order } from "../../components/Products/types";
import { UserContext } from "../../contexts/UserContext/context";

const Products: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

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
    <>
      <Helmet>
        <title>{t("products")}</title>
      </Helmet>

      {status === "loading" ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default Products;
