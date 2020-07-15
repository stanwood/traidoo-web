import { Tree } from "array-to-tree";
import { Category } from "../../core/interfaces/categories";

export interface CategoryItemsProps {
  categories: Tree<Category>[] | undefined;
}
