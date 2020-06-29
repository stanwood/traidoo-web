import { CreateRouteAPIRequest, Route } from "../../../core/interfaces/routes";
import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

const createRouteRequest = async ({
  frequency,
  origin,
  destination,
  waypoints,
}: CreateRouteAPIRequest): Promise<Route> => {
  return await api
    .post("routes", {
      json: {
        frequency,
        origin,
        destination,
        waypoints: waypoints.filter((waypoint) => waypoint),
      },
      headers: generateHeaders(true),
    })
    .json();
};

export default createRouteRequest;
