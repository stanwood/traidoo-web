import api from "../../../core/ky";
import { CheckoutType } from "../../../core/types/checkout";
import { generateHeaders } from "../../headers";

export const getCheckoutRequest = async (): Promise<CheckoutType> => {
  return await api.get("checkout", { headers: generateHeaders() }).json();
};

export const checkoutRequest = async () => {
  return await api
    .post("checkout", {
      headers: generateHeaders(),
    })
    .json();
};
