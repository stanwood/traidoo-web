import api from "../../../core/ky";
import { Order } from "../../../core/types/queries";
import { generateHeaders } from "../../headers";

export const getOrdersRequest = async (
  key: string,
  queryParams: {
    limit?: number;
    offset?: number;
    status: boolean;
    order?: Order;
    orderBy?: string;
    page?: number;
  }
) => {
  const limit = queryParams.limit || 10;
  const order = queryParams.order || "desc";
  const orderBy = queryParams.orderBy || "createdAt";

  let searchParams: any = {
    limit,
    offset: queryParams.offset || 0,
    status: queryParams.status,
  };

  if (queryParams.page) {
    searchParams["offset"] = queryParams.page * limit;
  }

  if (order && orderBy) {
    const filterMapping: {
      [key: string]: string | number | boolean;
    } = {
      createdAt: "created_at",
    };

    const sortMapping = {
      desc: "-",
      asc: "",
    };

    searchParams["ordering"] = `${sortMapping[order]}${filterMapping[orderBy]}`;
  }

  return await api
    .get("orders", {
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
