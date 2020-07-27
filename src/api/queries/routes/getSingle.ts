import axios from "../../../core/axios";
import { Route } from "../../../core/interfaces/routes";

const getRouteRequest = async (key: string, id: number): Promise<Route> => {
  const response = await axios.get(`routes/${id}`);
  return response.data;
};

export default getRouteRequest;
