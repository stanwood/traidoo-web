import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const changePasswordRequest = async (
  new_password: string,
  re_new_password: string,
  current_password: string
) => {
  return await api
    .post("auth/password", {
      headers: generateHeaders(),
      json: { new_password, re_new_password, current_password }
    })
    .json();
};
