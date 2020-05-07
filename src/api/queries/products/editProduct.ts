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
  const formData = objectToFormData(
    {
      ...data,
      image: data.image[0],
      tags: data.tags ? `[${data.tags.toString()}]` : undefined,
    },
    { indices: true }
  );

  // FIXME: This is a workaround for API issues
  if (data?.regions?.length < 1 && !formData.get("regions")) {
    formData.append("regions", "");
  }

  return await api
    .patch(`products/${productId}`, {
      body: formData,
      headers: generateHeaders(true, true),
    })
    .json();
};
