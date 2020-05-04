import api from "../../../core/ky";
import { Order } from "../../../core/types/queries";
import { generateHeaders } from "../../headers";

export const getProductItemsRequest = async (
  key: string,
  id: number,
  queryParams?: {
    limit?: number;
    offset?: number;
    order?: Order;
    orderBy?: string;
  }
) => {
  const offset = queryParams?.offset || 0;
  const limit = queryParams?.limit || 1000;
  const order = queryParams?.order || "desc";
  const orderBy = queryParams?.orderBy || "quantity";

  return await api
    .get(
      `products/${id}/items?offset=${offset}&limit=${limit}&order=${order}&orderBy=${orderBy}`,
      { headers: generateHeaders() }
    )
    .json();
};

export const addProductItemsRequest = async ({
  productId,
  quantity,
  latestDeliveryDate,
}: {
  productId: number;
  quantity: number;
  latestDeliveryDate: string;
}) => {
  return await api
    .post(`items`, {
      json: { productId, quantity, latestDeliveryDate },
      headers: generateHeaders(),
    })
    .json();
};

export const deleteProductItemsRequest = async ({
  productId,
  itemId,
}: {
  productId: number;
  itemId: number;
}) => {
  return await api
    .delete(`products/${productId}/items/${itemId}`, {
      headers: generateHeaders(),
    })
    .json();
};
