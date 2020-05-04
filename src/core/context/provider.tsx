import React from "react";
import Context from "./context";
import reducer from "./reducer";
import { ProviderProps, State } from "./types";

const defaultState: State = {
  message: { message: null, open: false },
  user: { id: undefined, groups: undefined },
  categories: [],
  cart: { earliestDeliveryDate: null, items: {} },
};

const Provider = ({ children }: ProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Provider;
