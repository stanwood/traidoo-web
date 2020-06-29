import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export interface Region {
  id: number;
  name: string;
  slug: string;
}

interface RequestResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Region[];
}

export const getRegionsRequest = async (
  key: string
): Promise<RequestResponse> => {
  return await api
    .get("regions", {
      headers: generateHeaders(true),
    })
    .json();
};
