import { objectToFormData } from "object-to-formdata";
import api from "../../../core/ky";
import { ProductFormData } from "../../../shared/products/ProductForm/types";
import { generateHeaders } from "../../headers";

export const editProductRequest = async ({
  productId,
  data,
}: {
  productId: number;
  data: ProductFormData;
}): Promise<any> => {
  console.log(data);
  const formData = objectToFormData(
    {
      ...data,
      image: data.image[0],
      tags: data.tags ? `[${data.tags.toString()}]` : undefined,
    },
    { indices: true }
  );

  // FIXME: Why objectToFormData removes regionIds?
  if (data?.regionIds?.length < 1 && !formData.get("regionIds")) {
    formData.append("regionIds", "[]");
  }

  return await api
    .patch(`products/${productId}`, {
      body: formData,
      headers: generateHeaders(true, true),
    })
    .json();
};
