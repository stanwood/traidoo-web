import api from "../../../core/ky";
import Product from "../../../core/types/product";
import { objectToFormData } from "../../../core/utils/objectToFormData";
import { ProductFormData } from "../../../shared/products/ProductForm/types";
import { generateHeaders } from "../../headers";
import fixData from "./renameKeys";

export const addProductRequest = async (
  data: ProductFormData
): Promise<Product> => {
  const formData = objectToFormData(
    {
      ...fixData(data),
      image: data.image[0],
      tags: data.tags ? `[${data.tags.toString()}]` : undefined,
    },
    { indices: false }
  );

  return await api
    .post("products", {
      body: formData,
      headers: generateHeaders(true, true),
    })
    .json();
};
