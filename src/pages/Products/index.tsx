import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
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
import Hello from "../../components/Hello";
import ProductsList from "../../components/Products";
import { TableColumnsWithSorting } from "../../components/Products/interfaces";
import { Order } from "../../components/Products/types";
import { Context } from "../../core/context";
import useStyles from "./styles";

const Products = () => {
  const classes = useStyles();

  const context = useContext(Context);
  const user = context.state.user;

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
    ["products", Object(query)],
    getProductsRequest
  );

  const [cartAdd] = useMutation(modifyCartRequest);

  const [cartDelete] = useMutation(removeFromCartRequest);

  const { refetch: refetchCart } = useQuery("/cart", getCartRequest, {
    onSuccess: (data: any) => {
      context.dispatch({ type: "cart", payload: data });
    },
  });

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

  if (!data || status === "loading") {
    return (
      <Container maxWidth="md">
        {Array.from(Array(10).keys()).map((number) => (
          <Skeleton key={number} />
        ))}
      </Container>
    );
  }

  return (
    <>
      {user?.id && <Hello className={classes.hello} />}

      <ProductsList
        products={data}
        page={calculatePage(query.page)}
        onPageChange={onPageChange}
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
        order={order}
        orderBy={orderBy}
        filterBy={filterBy}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </>
  );
};

export default Products;
