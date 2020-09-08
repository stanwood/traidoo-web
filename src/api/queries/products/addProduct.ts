import axios from "../../../core/axios";
import { ProductPostRequestData } from "../../../core/interfaces/products/productRequest";
import Product from "../../../core/types/product";
import { objectToFormData } from "../../../core/utils/objectToFormData";
import fixData from "./renameKeys";

export const addProductRequest = async (
  data: ProductPostRequestData
): Promise<Product> => {
  const formData = objectToFormData(
    {
      ...fixData(data),
      image: data.image ? data.image[0] : undefined,
      tags: data.tags ? `[${data.tags.toString()}]` : undefined,
    },
    { indices: false }
  );

  const response = await axios.post("products", formData);
  return response.data;
};
