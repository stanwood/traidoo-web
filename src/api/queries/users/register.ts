import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const registerRequest = async (data: any) => {
  return await api.post("registration", {
    body: data, // TODO: add type
    headers: generateHeaders(false, true),
  });
};

export const confirmRegistrationRequest = async (
  uid: string,
  token: string
) => {
  return await api
    .post("auth/verify_email", {
      json: { uid, token },
      headers: generateHeaders(false),
    })
    .json();
};
