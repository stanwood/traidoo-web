import axios from "../../../core/axios";
import { CheckoutType } from "../../../core/types/checkout";

export const getCheckoutRequest = async (): Promise<CheckoutType> => {
  const response = await axios.get("checkout");
  return response.data;
};

export const checkoutRequest = async () => {
  const response = await axios.post("checkout");
  return response.data;
};
