import axios from "../../../core/axios";

export const passwordSetRequest = async (
  uid: string,
  token: string,
  password: string
) => {
  const response = await axios.post("auth/password-set", {
    uid,
    token,
    new_password: password,
  });

  return response.data;
};
