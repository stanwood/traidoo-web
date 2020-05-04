import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const passwordSetRequest = async (
  uid: string,
  token: string,
  password: string
) => {
  return await api
    .post("auth/set_password", {
      json: { uid, token, new_password: password },
      headers: generateHeaders(false)
    })
    .json();
};
