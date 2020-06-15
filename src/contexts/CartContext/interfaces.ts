import { ReactChild } from "react";

export interface CartProduct {
  id: number;
  amount: number;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

export interface CartState {
  products: CartProduct[];
}

export interface CartProviderProps {
  children: ReactChild;
}

export interface CartStateContext {
  cart: CartState;
  refetch: () => void;
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: number) => void;
  setProductQuantity: (productId: number, quantity: number) => void;
  isProductInCart: (productId: number) => boolean;
  clear: () => void;
  initialState: () => void;
}
