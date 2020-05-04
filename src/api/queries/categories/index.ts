import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const getCategoriesRequest = async (
  key: string,
  hasProducts: boolean = true
) => {
  return await api
    .get("categories", {
      headers: generateHeaders(),
      searchParams: { has_products: hasProducts },
    })
    .json();
};
