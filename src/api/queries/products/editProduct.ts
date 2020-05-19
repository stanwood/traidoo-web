import api from "../../../core/ky";
import { objectToFormData } from "../../../core/utils/objectToFormData";
import { ProductFormData } from "../../../shared/components/products/ProductForm/types";
import { generateHeaders } from "../../headers";
import fixData from "./renameKeys";

export const editProductRequest = async ({
  productId,
  data,
}: {
  productId: number;
  data: ProductFormData;
}): Promise<any> => {
  const formData = objectToFormData(
    {
      ...fixData(data),
      image: data.image[0],
      tags: data.tags ? `[${data.tags.toString()}]` : undefined,
    },
    { indices: false }
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
