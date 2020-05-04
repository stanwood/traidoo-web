import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getCartRequest,
  modifyCartRequest,
  removeFromCartRequest,
} from "../../api/queries/cart";
import { getProductRequest } from "../../api/queries/products";
import ProductDetail from "../../components/Product";
import { Context } from "../../core/context";

const Product = () => {
  const context = useContext(Context);
  const { id } = useParams<{ id: string }>();
  const { status, data, error } = useQuery(
    ["/product", Number(id)],
    getProductRequest
  );
  const [cartAdd] = useMutation(modifyCartRequest);

  const [cartDelete] = useMutation(removeFromCartRequest);

  const { refetch: refetchCart } = useQuery("/cart", getCartRequest, {
    onSuccess: (data: any) => {
      context.dispatch({ type: "cart", payload: data });
    },
  });

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
    <ProductDetail
      product={data}
      error={error}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
    />
  );
};

export default Product;
