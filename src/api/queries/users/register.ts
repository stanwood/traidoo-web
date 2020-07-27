import axios from "../../../core/axios";

export const registerRequest = async (data: any) => {
  const response = await axios.post("registration", data);
  return response.data;
};

export const confirmRegistrationRequest = async (
  uid: string,
  token: string
) => {
  const response = await axios.post("auth/verify-email", { uid, token });
  return response.data;
};
