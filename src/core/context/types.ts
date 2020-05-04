import React, { Dispatch } from "react";
import CartStateType from "../types/cart";
import { CategoryType } from "../types/categories";

export type Actions =
  | { type: "user"; payload: any }
  | { type: "categories"; payload: any }
  | {
      type: "cart";
      payload: CartStateType;
    }
  | { type: "addMessage"; payload: { message: string } }
  | { type: "removeMessage" };

export type State = {
  message: { message: string | null; open: boolean };
  user: { id: number | undefined; groups: string[] | undefined };
  categories: CategoryType[];
  cart: CartStateType;
};

export type ContextProps = {
  state: State;
  dispatch: Dispatch<Actions>;
};

export type ProviderProps = { children: React.ReactNode };
