import React from "react";
import Context from "./context";
import reducer from "./reducer";
import { ProviderProps, State } from "./types";

const defaultState: State = {
  message: { message: null, open: false },
  user: { id: undefined, groups: undefined },
  categories: [],
};

const Provider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
