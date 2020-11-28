import { Tree } from "array-to-tree";
import { ReactChild } from "react";
import { Category } from "../../core/interfaces/categories";

export interface CategoriesStateContext {
  categories: Tree<Category>[];
  categoriesWithMainPageLink: Tree<Category>[];
}

export interface CategoriesProviderProps {
  children: ReactChild;
}
