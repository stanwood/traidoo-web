import api from "../../../core/ky";
import Product from "../../../core/types/product";
import { generateHeaders } from "../../headers";

export const getProductRequest = async (
  key: string,
  id: number
): Promise<Product> => {
  return await api.get(`products/${id}`, { headers: generateHeaders() }).json();
};

export default getProductRequest;
