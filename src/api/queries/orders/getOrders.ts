import { OrdersGetRequest } from "../../../core/interfaces/orders/ordersRequest";
import api from "../../../core/ky";
import { Order } from "../../../core/types/queries";
import { generateHeaders } from "../../headers";

const getOrdersRequest = async (
  key: string,
  type: string,
  queryParams: {
    limit?: number;
    offset?: number;
    order?: Order;
    orderBy?: string;
    page?: number;
  }
): Promise<OrdersGetRequest> => {
  const limit = queryParams.limit || 10;
  const order = queryParams.order || "desc";
  const orderBy = queryParams.orderBy || "createdAt";

  const searchParams: Record<string, string | number | boolean> = {
    limit,
    offset: queryParams.offset || 0,
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
    .get(`orders/${type}`, {
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

export default getOrdersRequest;
