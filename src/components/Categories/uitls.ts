import { Tree } from "array-to-tree";
import { Category } from "../../core/interfaces/categories";

export const findCategoryTreeById = (
  categories: Tree<Category>[],
  categoryId: string | undefined
): string[] => {
  if (!categoryId) {
    return [];
  }

  let found = false;
  let path: string[] = [];

  const findCategories = (categories: Tree<Category>[], categoryId: string) => {
    if (found) {
      return;
    }

    for (const category of Object.values(categories)) {
      if (found) {
        break;
      }

      if (!category.parent) {
        path = [];
      }

      if (category.children) {
        path.push(category.id.toString());
      }

      if (category.id === +categoryId) {
        path.push(category.id.toString());
        found = true;
        break;
      }

      if (category.children) {
        findCategories(category.children, categoryId);
      }
    }
  };

  findCategories(categories, categoryId);

  return path;
};
