import { ReactChild } from "react";
import { CategoryTree } from "../../core/interfaces/categories";

export interface CategoriesStateContext {
  categories: CategoryTree[];
}

export interface CategoriesProviderProps {
  children: ReactChild;
}
