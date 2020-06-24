import { ReactChild } from "react";

export interface UserState {
  id: number | undefined;
  groups: string[];
  isCooperativeMember: boolean;
  isEmailVerified: boolean;
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
