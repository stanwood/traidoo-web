import axios from "../../../core/axios";
import { Order } from "../../../core/types/queries";

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

  const response = await axios.get(
    `products/${id}/items?offset=${offset}&limit=${limit}&order=${order}&orderBy=${orderBy}`
  );

  return response.data;
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
  const response = await axios.post(`items`, {
    productId,
    quantity,
    latestDeliveryDate,
  });

  return response.data;
};

export const deleteProductItemsRequest = async ({
  productId,
  itemId,
}: {
  productId: number;
  itemId: number;
}) => {
  const response = await axios.delete(`products/${productId}/items/${itemId}`);
  return response.data;
};
