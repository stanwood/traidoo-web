import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const passwordSetRequest = async (
  uid: string,
  token: string,
  password: string
) => {
  return await api
    .post("auth/password-set", {
      json: { uid, token, new_password: password },
      headers: generateHeaders(false),
    })
    .json();
};
