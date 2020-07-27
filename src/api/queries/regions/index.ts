import axios from "../../../core/axios";

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
  const response = await axios.get("regions");
  return response.data;
};
