import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const getRegionsRequest = async (key: string) => {
  return await api
    .get("regions", {
      headers: generateHeaders(true),
    })
    .json();
};
