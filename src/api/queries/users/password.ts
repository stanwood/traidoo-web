import axios from "../../../core/axios";

export const changePasswordRequest = async (
  new_password: string,
  re_new_password: string,
  current_password: string
) => {
  const response = await axios.post("auth/password", {
    new_password,
    re_new_password,
    current_password,
  });

  return response.data;
};
