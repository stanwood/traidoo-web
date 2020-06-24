import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const resendEmailVerificationRequest = async (): Promise<void> => {
  return await api
    .post("auth/verify-email/resend", {
      headers: generateHeaders(true),
    })
    .json();
};
