import axios from "../../../core/axios";
import { Category } from "../../../core/interfaces/categories";

export const getCategoriesRequest = async (
  key: string,
  hasProducts = true
): Promise<Category[]> => {
  const categories = await axios.get("categories", {
    params: { has_products: hasProducts },
  });

  const data: Category[] = categories.data;

  return data.sort((a: Category, b: Category) => (a.name > b.name ? 1 : -1));
};
