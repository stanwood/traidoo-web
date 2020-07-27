import axios from "../../../core/axios";

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

  const response = await axios.get("jobs", {
    params: Object.keys(searchParams).reduce(function (
      accumulator: any,
      currentValue: string
    ) {
      if (searchParams[currentValue])
        accumulator[currentValue] = searchParams[currentValue];
      return accumulator;
    },
    {}),
  });

  return response.data;
};
