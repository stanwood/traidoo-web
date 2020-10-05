import Dinero from "dinero.js";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useMutation, useQuery } from "react-query";
import { getAccessToken } from "../../api/jwt";
import {
  deleteCartRequest,
  getCartRequest,
  modifyCartRequest,
  removeFromCartRequest,
} from "../../api/queries/cart";
import {
  CART_ADD,
  CART_CLEAN,
  CART_INITIALIZE,
  CART_PRODUCT_QUANTITY,
  CART_REMOVE,
} from "./actions";
import { CartContext } from "./context";
import { CartProduct, CartProviderProps } from "./interfaces";
import { cartInitialState, reducer } from "./reducer";

const CartProvider = (props: CartProviderProps): ReactElement => {
  const [cart, dispatch] = useReducer(reducer, cartInitialState);
  const [updateCart] = useMutation(modifyCartRequest);
  const [removeFromCart] = useMutation(removeFromCartRequest);
  const [removeCart] = useMutation(deleteCartRequest);

  const { refetch } = useQuery("/cart", getCartRequest, {
    enabled: false,
    onSuccess: (data: any) => {
      dispatch({
        type: CART_INITIALIZE,
        payload: data,
      });
    },
  });

  useEffect(() => {
    if (getAccessToken()) refetch();
  }, [refetch]);

  const cartTotal: number = useMemo(() => {
    const total = cart.products.reduce((accumulator, product) => {
      return accumulator + product.amount * product.quantity * product.price;
    }, 0);

    return Dinero({
      amount: Math.round(total * 100),
      currency: "EUR",
    }).toUnit();
  }, [cart]);

  const addProduct = useCallback(
    (product: CartProduct) => {
      dispatch({
        type: CART_ADD,
        payload: product,
      });
      updateCart({ productId: product.id, quantity: 1 });
    },
    [dispatch, updateCart]
  );

  const removeProduct = useCallback(
    (productId: number) => {
      dispatch({
        type: CART_REMOVE,
        payload: { id: productId },
      });
      removeFromCart({ productId });
    },
    [dispatch, removeFromCart]
  );

  const setProductQuantity = useCallback(
    (productId: number, quantity: number) => {
      dispatch({
        type: CART_PRODUCT_QUANTITY,
        payload: { id: productId, quantity },
      });

      updateCart({ productId, quantity });
    },
    [dispatch, updateCart]
  );

  const clear = useCallback(() => {
    dispatch({
      type: CART_CLEAN,
    });
    removeCart();
  }, [dispatch, removeCart]);

  const initialState = useCallback(() => {
    dispatch({
      type: CART_CLEAN,
    });
  }, [dispatch]);

  const isProductInCart = (productId: number): boolean => {
    return cart.products.some((product) => product.id === productId);
  };

  const value = {
    cart,
    cartTotal,
    refetch,
    addProduct,
    removeProduct,
    setProductQuantity,
    clear,
    isProductInCart,
    initialState,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
