import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const getJobs = async (
  key: string,
  queryParams?: { page?: number; limit?: number; my?: boolean }
): Promise<{ count: number; results: any[] }> => {
  const limit = queryParams?.limit || 10;
  const my = queryParams?.my || false;

  const searchParams: any = {
    limit,
    offset: 0,
    my,
  };

  if (queryParams?.page) {
    searchParams["offset"] = queryParams.page * limit;
  }

  return await api
    .get("jobs", {
      headers: generateHeaders(true),
      searchParams: Object.keys(searchParams).reduce(function (
        accumulator: any,
        currentValue: string
      ) {
        if (searchParams[currentValue])
          accumulator[currentValue] = searchParams[currentValue];
        return accumulator;
      },
      {}),
    })
    .json();
};
