import axios from "../../../core/axios";

export const getProductItemsRequest = async (key: string, id: number) => {
  const response = await axios.get(`items/${id}`);
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
  const response = await axios.post(`items/${productId}`, {
    quantity,
    latestDeliveryDate,
  });

  return response.data;
};

export const editProductItemsRequest = async ({
  productId,
  itemId,
  quantity,
  latestDeliveryDate,
}: {
  productId: number;
  itemId: number;
  quantity: number;
  latestDeliveryDate: string;
}) => {
  const response = await axios.patch(`items/${productId}/${itemId}`, {
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
  const response = await axios.delete(`items/${productId}/${itemId}`);
  return response.data;
};
