import { createContext } from "react";
import { DrawerStateContext } from "./interfaces";

export const DrawerContext = createContext<DrawerStateContext>(
  {} as DrawerStateContext
);
