import axios from "../../../core/axios";
import { RoutesAPIResponse } from "../../../core/interfaces/routes";

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

  const response = await axios.get("routes", {
    params: Object.keys(searchParams).reduce(
      (accumulator: any, currentValue: string) => {
        if (searchParams[currentValue])
          accumulator[currentValue] = searchParams[currentValue];
        return accumulator;
      },
      {}
    ),
  });

  return response.data;
};

export default getRoutesRequest;
