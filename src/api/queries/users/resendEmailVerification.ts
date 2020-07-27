import axios from "../../../core/axios";

export const resendEmailVerificationRequest = async (): Promise<void> => {
  const response = await axios.post("auth/verify-email/resend");
  return response.data;
};
