import React, {
  createContext,
  ReactChild,
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { useMutation, useQuery } from "react-query";
import {
  deleteCartRequest,
  getCartRequest,
  modifyCartRequest,
  removeFromCartRequest,
} from "../api/queries/cart";

export interface CartProduct {
  id: number;
  amount: number;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

interface CartState {
  products: CartProduct[];
}

interface CartProviderProps {
  children: ReactChild;
}

interface CartStateContext {
  cart: CartState;
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: number) => void;
  setProductQuantity: (productId: number, quantity: number) => void;
  isProductInCart: (productId: number) => boolean;
  clear: () => void;
}

const cartInitialState: CartState = {
  products: [],
};

const CART_INITIALIZE = "CART_INITIALIZE";
const CART_ADD = "CART_ADD";
const CART_REMOVE = "CART_REMOVE";
const CART_PRODUCT_QUANTITY = "CART_PRODUCT_QUANTITY";
const CART_CLEAN = "CART_CLEAN";

type Actions =
  | { type: "CART_ADD"; payload: CartProduct }
  | { type: "CART_REMOVE"; payload: { id: number } }
  | { type: "CART_INITIALIZE"; payload: CartState }
  | {
      type: "CART_PRODUCT_QUANTITY";
      payload: { id: number; quantity: number };
    }
  | { type: "CART_CLEAN" };

export const CartContext = createContext<CartStateContext>(
  {} as CartStateContext
);

const reducer = (state: CartState, action: Actions): CartState => {
  if (action.type === CART_INITIALIZE) {
    return { ...state, ...action.payload };
  }

  if (action.type === CART_ADD) {
    return { ...state, products: [...state.products, action.payload] };
  }

  if (action.type === CART_REMOVE) {
    return {
      ...state,
      products: state.products.filter((item) => item.id !== action.payload.id),
    };
  }

  if (action.type === CART_PRODUCT_QUANTITY) {
    const products = [...state.products];
    const index = products.findIndex(
      (product) => product.id == action.payload.id
    );
    products[index].quantity = action.payload.quantity;
    return { ...state, ...products };
  }

  if (action.type === CART_CLEAN) {
    return { ...cartInitialState };
  }

  return state;
};

export const CartProvider = (props: CartProviderProps): ReactElement => {
  const [cart, dispatch] = useReducer(reducer, cartInitialState);
  const [updateCart] = useMutation(modifyCartRequest);
  const [removeFromCart] = useMutation(removeFromCartRequest);
  const [removeCart] = useMutation(deleteCartRequest);

  const { refetch } = useQuery("/cart", getCartRequest, {
    onSuccess: (data: any) => {
      dispatch({
        type: CART_INITIALIZE,
        payload: data,
      });
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const addProduct = useCallback(
    (product: CartProduct) => {
      dispatch({
        type: CART_ADD,
        payload: product,
      });
      updateCart({ productId: product.id, quantity: 1 });
    },
    [dispatch]
  );

  const removeProduct = useCallback(
    (productId: number) => {
      dispatch({
        type: CART_REMOVE,
        payload: { id: productId },
      });
      removeFromCart({ productId });
    },
    [dispatch]
  );

  const setProductQuantity = useCallback(
    (productId: number, quantity: number) => {
      dispatch({
        type: CART_PRODUCT_QUANTITY,
        payload: { id: productId, quantity },
      });

      updateCart({ productId, quantity });
    },
    [dispatch]
  );

  const clear = useCallback(() => {
    dispatch({
      type: CART_CLEAN,
    });
    removeCart();
  }, [dispatch]);

  const isProductInCart = (productId: number): boolean => {
    return cart.products.some((product) => product.id === productId);
  };

  const value = {
    cart,
    addProduct,
    removeProduct,
    setProductQuantity,
    clear,
    isProductInCart,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};
