import { createContext } from "react";
import { CategoriesStateContext } from "./interfaces";

export const CategoriesContext = createContext<CategoriesStateContext>(
  {} as CategoriesStateContext
);
