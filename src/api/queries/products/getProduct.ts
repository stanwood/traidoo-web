import axios from "../../../core/axios";
import Product from "../../../core/types/product";

export const getProductRequest = async (
  key: string,
  id: number
): Promise<Product> => {
  const response = await axios.get(`products/${id}`);
  return response.data;
};

export default getProductRequest;
