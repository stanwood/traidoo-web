import { CategoryType } from "../../core/types/categories";

export const findCategoryTreeById = (
  categories: CategoryType[],
  categoryId: string | undefined
) => {
  if (!categoryId) {
    return [];
  }

  let found = false;
  let path: string[] = [];

  const findCategories = (categories: CategoryType[], categoryId: string) => {
    if (found) {
      return;
    }

    for (let category of Object.values(categories)) {
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
