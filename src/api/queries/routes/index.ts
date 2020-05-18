import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const getRoutes = async (
  key: string,
  queryParams?: { page?: number; limit?: number }
): Promise<{
  count: number;
  next: number;
  previous: number;
  results: {
    id: number;
    frequency: number[];
    origin: string;
    destination: string;
    waypoints: string[];
  }[];
}> => {
  const limit = queryParams?.limit || 10;

  const searchParams: any = {
    limit,
    offset: 0,
  };

  if (queryParams?.page) {
    searchParams["offset"] = queryParams.page * limit;
  }

  return await api
    .get("routes", {
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

export const createRoute = async ({
  frequency,
  origin,
  destination,
  waypoints,
}: {
  frequency: number[];
  origin: string;
  destination: string;
  waypoints: any[];
}) => {
  return await api.post("routes", {
    json: { frequency, origin, destination, waypoints },
    headers: generateHeaders(true),
  });
};
