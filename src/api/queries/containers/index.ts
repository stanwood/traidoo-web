import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const getContainersRequest = async (key: string) => {
  return await api
    .get("container_types", {
      headers: generateHeaders(true),
    })
    .json();
};
