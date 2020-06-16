import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const getCurrentUserRequest = async (): Promise<{
  id: number;
  groups: string[];
}> => {
  return await api
    .get("users/profile/me", { headers: generateHeaders() })
    .json();
};

export const getSellerByIdRequest = async (key: string, id: number) => {
  return await api.get(`sellers/${id}`, { headers: generateHeaders() }).json();
};
