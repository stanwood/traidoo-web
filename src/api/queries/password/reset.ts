import axios from "../../../core/axios";

export const passwordResetRequest = async (email: string) => {
  const response = await axios.post("auth/password-reset", { email });
  return response.data;
};
