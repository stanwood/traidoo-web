import { CartProduct, CartState } from "./interfaces";

export const CART_INITIALIZE = "CART_INITIALIZE";
export const CART_ADD = "CART_ADD";
export const CART_REMOVE = "CART_REMOVE";
export const CART_PRODUCT_QUANTITY = "CART_PRODUCT_QUANTITY";
export const CART_CLEAN = "CART_CLEAN";
export const CART_INITIAL_STATE = "CART_INITIAL_STATE";

export type Actions =
  | { type: "CART_ADD"; payload: CartProduct }
  | { type: "CART_REMOVE"; payload: { id: number } }
  | { type: "CART_INITIALIZE"; payload: CartState }
  | {
      type: "CART_PRODUCT_QUANTITY";
      payload: { id: number; quantity: number };
    }
  | { type: "CART_CLEAN" };
