import axios from "../../../core/axios";
import { CheckoutType } from "../../../core/types/checkout";
import { CheckoutDeliveryOptions } from "../../../core/types/checkoutDeliveryOptions";

export const getCheckoutRequest = async (): Promise<CheckoutType> => {
  const response = await axios.get("checkout");
  return response.data;
};

export const getCheckoutDeliveryOptionsRequest = async (): Promise<
  CheckoutDeliveryOptions
> => {
  const response = await axios.get("checkout/delivery");
  return response.data;
};

export const checkoutRequest = async () => {
  const response = await axios.post("checkout");
  return response.data;
};
