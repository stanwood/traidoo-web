import axios from "../../../core/axios";
import { ProductPostRequestData } from "../../../core/interfaces/products/productRequest";
import { objectToFormData } from "../../../core/utils/objectToFormData";
import fixData from "./renameKeys";

export const editProductRequest = async ({
  productId,
  data,
}: {
  productId: number;
  data: ProductPostRequestData;
}): Promise<any> => {
  const formData = objectToFormData(
    {
      ...fixData(data),
      image: data.image ? data.image[0] : undefined,
      tags: data.tags ? `[${data.tags.toString()}]` : undefined,
    },
    { indices: false }
  );

  // FIXME: This is a workaround for API issues
  if (
    (!data?.regions || data?.regions?.length < 1) &&
    !formData.get("regions")
  ) {
    formData.append("regions", "");
  }

  const response = await axios.patch(`products/${productId}`, formData);
  return response.data;
};
