import axios from "../../../core/axios";

export const modifyCartRequest = async ({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) => {
  const response = await axios.post("cart", { productId, quantity });
  return response.data;
};

export const cartDeliveryDateRequest = async ({ date }: { date: string }) => {
  const response = await axios.post("cart/delivery", { date });
  return response.data;
};

export const cartDeliveryAddressRequest = async (deliveryAddress: number) => {
  const response = await axios.post("cart/deliveryAddress", {
    deliveryAddress,
  });
  return response.data;
};

export const cartItemDeliveryOptionRequest = async ({
  productId,
  deliveryOption,
}: {
  productId: number;
  deliveryOption: number;
}) => {
  const response = await axios.post(`cart/${productId}/delivery_option`, {
    deliveryOption,
  });
  return response.data;
};

export const removeFromCartRequest = async ({
  productId,
}: {
  productId: number;
}) => {
  const response = await axios.delete(`cart/${productId}`);
  return response.data;
};

export const deleteCartRequest = async () => {
  const response = await axios.delete(`cart`);
  return response.data;
};

export const getCartRequest = async () => {
  const response = await axios.get("cart");
  return response.data;
};

export const cartDeliveryOptionBulkEditRequest = async ({
  deliveryOption,
}: {
  deliveryOption: number;
}) => {
  const response = await axios.post(`cart/deliveryOption`, {
    deliveryOption,
  });
  return response.data;
};
