import { UserState } from "../../../contexts/UserContext/interfaces";
import axios from "../../../core/axios";

export const getCurrentUserRequest = async (): Promise<UserState> => {
  const response = await axios.get("users/profile/me");
  return response.data;
};

export const getSellerByIdRequest = async (key: string, id: number) => {
  const response = await axios.get(`sellers/${id}`);
  return response.data;
};
