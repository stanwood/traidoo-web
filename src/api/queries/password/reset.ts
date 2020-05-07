import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const passwordResetRequest = async (email: string) => {
  return await api
    .post("auth/password-reset", {
      json: { email },
      headers: generateHeaders(false),
    })
    .json();
};
