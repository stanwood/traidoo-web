import arrayToTree from "array-to-tree";
import api from "../../../core/ky";
import { CategoryType } from "../../../core/types/categories";
import { generateHeaders } from "../../headers";

export const getCategoriesRequest = async (
  key: string,
  hasProducts: boolean = true
): Promise<CategoryType[]> => {
  return arrayToTree(
    await api
      .get("categories", {
        headers: generateHeaders(),
        searchParams: { has_products: hasProducts },
      })
      .json(),
    { parentProperty: "parent" }
  );
};
