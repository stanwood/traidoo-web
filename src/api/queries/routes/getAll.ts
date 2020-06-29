import { RoutesAPIResponse } from "../../../core/interfaces/routes";
import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

const getRoutesRequest = async (
  key: string,
  queryParams?: { page?: number; limit?: number }
): Promise<RoutesAPIResponse> => {
  const limit = queryParams?.limit || 10;

  const searchParams: Record<string, number> = {
    limit,
    offset: 0,
  };

  if (queryParams?.page) {
    searchParams["offset"] = queryParams.page * limit;
  }

  return await api
    .get("routes", {
      headers: generateHeaders(true),
      searchParams: Object.keys(searchParams).reduce(
        (accumulator: any, currentValue: string) => {
          if (searchParams[currentValue])
            accumulator[currentValue] = searchParams[currentValue];
          return accumulator;
        },
        {}
      ),
    })
    .json();
};

export default getRoutesRequest;
