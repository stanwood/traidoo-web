import { Route } from "../../../core/interfaces/routes";
import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

const getRouteRequest = async (key: string, id: number): Promise<Route> => {
  return await api
    .get(`routes/${id}`, {
      headers: generateHeaders(true),
    })
    .json();
};

export default getRouteRequest;
