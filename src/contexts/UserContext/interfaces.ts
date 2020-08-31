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
  refetch: () => Promise<UserState | undefined>;
  canBuy: boolean;
  isSeller: boolean;
  isIdle: boolean;
  isLoading: boolean;
}

export interface UserProviderProps {
  children: ReactChild;
}
