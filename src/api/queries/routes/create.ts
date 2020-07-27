import axios from "../../../core/axios";
import { CreateRouteAPIRequest, Route } from "../../../core/interfaces/routes";

const createRouteRequest = async ({
  frequency,
  origin,
  destination,
  waypoints,
}: CreateRouteAPIRequest): Promise<Route> => {
  const response = await axios.post("routes", {
    frequency,
    origin,
    destination,
    waypoints: waypoints.filter((waypoint) => waypoint),
  });

  return response.data;
};

export default createRouteRequest;
