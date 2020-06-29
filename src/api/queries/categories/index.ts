import { Category } from "../../../core/interfaces/categories";
import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const getCategoriesRequest = async (
  key: string,
  hasProducts = true
): Promise<Category[]> => {
  const categories: Category[] = await api
    .get("categories", {
      headers: generateHeaders(),
      searchParams: { has_products: hasProducts },
    })
    .json();

  return categories.sort((a: Category, b: Category) =>
    a.name > b.name ? 1 : -1
  );
};
