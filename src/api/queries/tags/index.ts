import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const getTagsRequest = async (key: string) => {
  return await api
    .get("tags", {
      headers: generateHeaders(true),
    })
    .json();
};
