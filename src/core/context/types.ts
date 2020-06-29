import React, { Dispatch } from "react";

export type Actions =
  | { type: "addMessage"; payload: { message: string } }
  | { type: "removeMessage" };

export type State = {
  message: { message: string | null; open: boolean };
};

export type ContextProps = {
  state: State;
  dispatch: Dispatch<Actions>;
};

export type ProviderProps = { children: React.ReactNode };
