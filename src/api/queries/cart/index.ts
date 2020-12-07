import axios from "../../../core/axios";
import * as Sentry from "@sentry/react";

export const modifyCartRequest = async ({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) => {
  Sentry.addBreadcrumb({
    category: "cart",
    message: `Update the cart: product ID: ${productId}, quantity: ${quantity}.`,
    level: Sentry.Severity.Info,
  });
  const response = await axios.post("cart", { productId, quantity });
  return response.data;
};

export const cartDeliveryDateRequest = async ({ date }: { date: string }) => {
  Sentry.addBreadcrumb({
    category: "cart",
    message: `Set delivery date to ${date}.`,
    level: Sentry.Severity.Info,
  });
  const response = await axios.post("cart/delivery", { date });
  return response.data;
};

export const cartDeliveryAddressRequest = async (deliveryAddress: number) => {
  Sentry.addBreadcrumb({
    category: "cart",
    message: `Set delivery address to ${deliveryAddress}.`,
    level: Sentry.Severity.Info,
  });
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
  Sentry.addBreadcrumb({
    category: "cart",
    message: `Set delivery option: product ID: ${productId}, delivery option ID: ${deliveryOption}.`,
    level: Sentry.Severity.Info,
  });
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
  Sentry.addBreadcrumb({
    category: "cart",
    message: `Remove product ${productId} from cart.`,
    level: Sentry.Severity.Info,
  });
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
  Sentry.addBreadcrumb({
    category: "cart",
    message: `Bulk delivery option update: ${deliveryOption}.`,
    level: Sentry.Severity.Info,
  });
  const response = await axios.post(`cart/deliveryOption`, {
    deliveryOption,
  });
  return response.data;
};
