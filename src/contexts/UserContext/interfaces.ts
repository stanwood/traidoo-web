import { ReactChild } from "react";

export interface UserState {
  id: number | undefined;
  groups: string[];
}

export interface UserStateContext {
  user: UserState;
  logout: () => void;
  refetch: () => Promise<UserState>;
  canBuy: boolean;
  isSeller: boolean;
}

export interface UserProviderProps {
  children: ReactChild;
}
