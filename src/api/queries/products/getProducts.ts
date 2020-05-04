import api from "../../../core/ky";
import { Order } from "../../../core/types/queries";
import { generateHeaders } from "../../headers";
import { ProductsListResponse } from "./interfaces";

export const getProductsRequest = async (
  key: string,
  queryParams: {
    limit?: number;
    offset?: number;
    isAvailable?: boolean;
    category?: number;
    search?: string;
    page?: number;
    organic?: boolean;
    order?: Order;
    orderBy?: string;
    seller?: number;
    my?: boolean;
  }
): Promise<ProductsListResponse> => {
  const limit = queryParams.limit || 10;
  const order = queryParams.order || "desc";
  const orderBy = queryParams.orderBy || "createdAt";

  let searchParams: any = {
    limit,
    offset: queryParams.offset || 0,
    category__id: queryParams.category,
    search: queryParams.search,
  };

  if (queryParams.isAvailable !== undefined) {
    searchParams["is_available"] = queryParams.isAvailable.toString();
  }

  if (queryParams.page) {
    searchParams["offset"] = queryParams.page * limit;
  }

  if (queryParams.organic) {
    searchParams["is_organic"] = true;
  }

  if (order && orderBy) {
    const filterMapping: {
      [key: string]: string | number | boolean;
    } = {
      createdAt: "created_at",
      name: "name",
      seller: "seller__company_name",
      category: "category__name",
      price: "price",
    };

    const sortMapping = {
      desc: "-",
      asc: "",
    };

    searchParams["ordering"] = `${sortMapping[order]}${filterMapping[orderBy]}`;
  }

  if (queryParams.seller) {
    searchParams["seller__id"] = queryParams.seller;
  }

  if (queryParams.my) {
    searchParams["my"] = true;
  }

  return await api
    .get("products", {
      headers: generateHeaders(),
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

export default getProductsRequest;
