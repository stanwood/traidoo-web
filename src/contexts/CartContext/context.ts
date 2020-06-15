import { createContext } from "react";
import { CartStateContext } from "./interfaces";

export const CartContext = createContext<CartStateContext>(
  {} as CartStateContext
);
