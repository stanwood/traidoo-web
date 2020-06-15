import {
  Actions,
  CART_ADD,
  CART_CLEAN,
  CART_INITIALIZE,
  CART_PRODUCT_QUANTITY,
  CART_REMOVE,
} from "./actions";
import { CartState } from "./interfaces";

export const cartInitialState: CartState = {
  products: [],
};

export const reducer = (state: CartState, action: Actions): CartState => {
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
