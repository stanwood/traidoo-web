import { createContext } from "react";
import { UserStateContext } from "./interfaces";

export const UserContext = createContext<UserStateContext>(
  {} as UserStateContext
);
