import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const modifyCartRequest = async ({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) => {
  return await api
    .post("cart", {
      headers: generateHeaders(),
      json: { productId, quantity },
    })
    .json();
};

export const cartDeliveryDateRequest = async ({ date }: { date: string }) => {
  return await api
    .post("cart/delivery", {
      headers: generateHeaders(),
      json: { date },
    })
    .json();
};

export const cartDeliveryAddressRequest = async (deliveryAddress: number) => {
  return await api
    .post("cart/deliveryAddress", {
      headers: generateHeaders(),
      json: { deliveryAddress },
    })
    .json();
};

export const cartItemDeliveryOptionRequest = async ({
  productId,
  deliveryOption,
}: {
  productId: number;
  deliveryOption: number;
}) => {
  return await api
    .post(`cart/${productId}/delivery_option`, {
      headers: generateHeaders(),
      json: { deliveryOption },
    })
    .json();
};

export const removeFromCartRequest = async ({
  productId,
}: {
  productId: number;
}) => {
  return await api
    .delete(`cart/${productId}`, { headers: generateHeaders() })
    .json();
};

export const deleteCartRequest = async () => {
  return await api.delete(`cart`, { headers: generateHeaders() }).json();
};

export const getCartRequest = async () => {
  return await api.get("cart", { headers: generateHeaders() }).json();
};
