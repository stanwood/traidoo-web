import { objectToFormData } from "object-to-formdata";
import api from "../../../core/ky";
import Product from "../../../core/types/product";
import { ProductFormData } from "../../../shared/products/ProductForm/types";
import { generateHeaders } from "../../headers";

export const addProductRequest = async (
  data: ProductFormData
): Promise<Product> => {
  const formData = objectToFormData(
    {
      ...data,
      image: data.image[0],
      tags: data.tags ? `[${data.tags.toString()}]` : undefined,
    },
    { indices: true }
  );

  return await api
    .post("products", {
      body: formData,
      headers: generateHeaders(true, true),
    })
    .json();
};
