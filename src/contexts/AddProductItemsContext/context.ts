import { createContext } from "react";
import { AddProductItemsStateContext } from "./interfaces";

export const AddProductItemsContext = createContext<
  AddProductItemsStateContext
>({} as AddProductItemsStateContext);
